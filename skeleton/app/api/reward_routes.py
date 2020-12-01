from flask import Blueprint, render_template, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import current_user
from app.models import db, Reward, Redeemed, Member, Program
from app.schemas import reward_schema, redeemed_schema, color_schema, stamp_schema, user_schema, program_schema, member_schema
from app.utils import dump_data_list, dumpProgramFullData, dumpRewardFullData, dumpRedeemedData
from app.forms import RewardForm
from pprint import pprint

reward_routes = Blueprint("rewards", __name__, url_prefix="/rewards")

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@reward_routes.route("/<string:type>")
def type_rewards(type):
    """Get a list of all default-universal rewards, by type if specified."""
    if type:
        rewards = Reward.query.filter(Reward.type == type).all()
    else:
        rewards = Reward.query.filter(Reward.typ != 'custom').all()
    return jsonify(dump_data_list(rewards, reward_schema))


@reward_routes.route("/programs/<int:pid>/users/<int:uid>")
def program_and_rewards_and_redeemed(pid, uid):
    """Get a list of a program's custom rewards."""
    print("\n\nGETTING ALL PROGRAM REWARDS")
    program = Program.query.get(pid)
    program_data = dumpProgramFullData(program)
    
    rewards = Reward.query.filter(Reward.program_id == pid).options(joinedload(Reward.stamp), joinedload(Reward.color), joinedload(Reward.creator)).all()
    
    rewards_obj = {}
    rewards_data = dump_data_list(rewards, reward_schema)
    rewards_data = [reward for reward in rewards_data]
    for reward in rewards:
        rewards_obj[reward.id] = dumpRewardFullData(reward)
    
    redeemed = Redeemed.query.join(Redeemed.reward) \
        .filter(Redeemed.user_id == uid, Reward.program_id == pid) \
        .options( \
        joinedload(Redeemed.reward), \
        joinedload(Redeemed.user), \
        joinedload(Redeemed.reward).joinedload(Reward.color), \
        joinedload(Redeemed.reward).joinedload(Reward.stamp) \
        ).order_by(Redeemed.redeemed_at).all()
    
    redeemed_data = dump_data_list(redeemed, redeemed_schema)
    i = 0
    for redeemed_one in redeemed:
        dumpRedeemedData(redeemed_data[i], redeemed_one.reward)
        i += 1
    print("\n\n\nPROGRAM, REDEEMED, REWARDS")
    pprint(program_data)
    pprint(redeemed_data)
    pprint(rewards_data)
    return jsonify(program_data=program_data, rewards_data=rewards_obj, redeemed_data=redeemed_data)


@reward_routes.route("/programs/<int:pid>/rewards")
def program_rewards(pid):
    """Get a list of a program's custom rewards."""
    rewards = Reward.query.filter(Reward.program_id == pid).options(joinedload(Reward.stamp), joinedload(Reward.color), joinedload(Reward.creator)).all()
    
    rewards_obj = {}
    rewards_data = dump_data_list(rewards, reward_schema)
    rewards_data = [reward for reward in rewards_data]
    for reward in rewards:
        rewards_obj[reward.id] = dumpRewardFullData(reward)
    return jsonify(rewards_obj)


@reward_routes.route("/programs/<int:pid>/create", methods=["POST"])
def create_reward(pid):
    print("\nmaking reward")
    form = RewardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("REWARD FORM", form.data, form.validate())
    
    if form.validate():
        print("VALIDATED")
        reward = Reward(reward=form['reward'].data,
                        type='custom',
                        description=form['description'].data,
                        color_id=form['color'].data,
                        stamp_id=form['stamp'].data,
                        cost=form['cost'].data,
                        limit_per_member=form['limit'].data,
                        quantity=form['quantity'].data,
                        creator_id=request.json['userId'],
                        program_id=pid,)
        db.session.add(reward)
        db.session.commit()
            
        reward_data = dumpRewardFullData(reward)
        print("\nCREATED REWARD")
        pprint(reward_data)
        return jsonify(reward_data)
    return {'errors': ['Failed to create reward']}, 400


@reward_routes.route("/<int:rid>/edit", methods=["PATCH"])
def edit_reward(rid):
    """Edit a reward by id."""
    print("yeeee")
    form = RewardForm()
    print("\nFORM AND VALIDATE", form.data, form.validate())
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate():
        reward = Reward.query.options(joinedload(Reward.color), joinedload(Reward.stamp)).get(rid)
        reward.reward = form["reward"].data
        reward.description = form["description"].data
        reward.cost = form["cost"].data
        reward.quantity = form["quantity"].data
        reward.limit_per_member = form["limit"].data
        reward.color_id = form["color"].data
        reward.stamp_id = form["stamp"].data
        
        db.session.commit()
        reward_data = dumpRewardFullData(reward)
        
        print("\n\nEDITED REWARD")
        pprint(reward_data)
        return jsonify(reward_data)
    return {'errors': ['Editing reward failed']}, 400


@reward_routes.route("/<int:rid>/delete", methods=["DELETE"])
def delete_reward(rid):
    """Delete a reward by id."""
    reward = Reward.query.get(rid)
    db.session.delete(reward)
    db.session.commit()
    return "The reward has been smited D:"


@reward_routes.route("/<int:rid>/members/<int:mid>/redeem")
def redeem_reward(rid, mid):
    """Redeem a reward for a member."""
    reward = Reward.query.filter(Reward.id == rid).one()
    member = Member.query.filter(Member.id == mid).one()
    
    if reward.limit_per_member > 0:
        redeemed_count = Redeemed.query.filter(Redeemed.reward_id == reward.id, Redeemed.user_id == member.member.id).count()
        if redeemed_count >= reward.limit_per_member:
            return {'errors': [f"You have too many, sorry T_T . Only {str(reward.limit_per_member)} per customer!"]}, 400

    if reward.quantity == 0:
        return {'errors': ["There aren't any left, sorry T_T"]}, 400
    
    if member.points < reward.cost:
        return {'errors': ["You need more points please TT_TT"]}, 400
    
    if reward.quantity > 0:
        reward.quantity -= 1
        
    member.points -= reward.cost
    redeemed = Redeemed(user_id=member.member_id,
                        reward_id=reward.id,)
    db.session.add(redeemed)
    db.session.commit()
    redeemed_data = redeemed_schema.dump(redeemed)
    dumpRedeemedData(redeemed_data, reward)

    print("\n\nREDEEMED REWARD", redeemed_data)
    print("\n\nMEMBER NOW", member)
    return jsonify(points=member.points, redeemed_data=redeemed_data)
    
    
@reward_routes.route("/programs/<int:pid>/users/<int:uid>/redeemed")
def redeemed_rewards(pid, uid):
    """Get a list of a user's redeemed rewards, ordered by redeemed_at dates."""
    redeemed = Redeemed.query.join(Redeemed.reward) \
      .filter(Redeemed.user_id == uid, Reward.program_id == pid) \
      .options( \
      joinedload(Redeemed.reward), \
      joinedload(Redeemed.user), \
      joinedload(Redeemed.reward).joinedload(Reward.color), \
      joinedload(Redeemed.reward).joinedload(Reward.stamp) \
      ).order_by(Redeemed.redeemed_at).all()
    
    redeemed_data = dump_data_list(redeemed, redeemed_schema)
    i = 0
    for reward in redeemed:
        dumpRedeemedData(redeemed_data, reward)
        i += 1
    print("\n\nREDEEMED REWARDS LIST")
    pprint(redeemed_data)
    return jsonify(redeemed_data)