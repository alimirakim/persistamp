from flask import Blueprint, render_template, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import current_user
from app.models import db, Reward, Redeemed, Membership, Program
from app.schemas import reward_schema, redeemed_schema, color_schema, icon_schema, user_schema, program_schema, membership_schema
from app.utils import dump_data_list, validation_errors_to_error_messages
from app.forms import RewardForm
from pprint import pprint

reward_routes = Blueprint("rewards", __name__, url_prefix="/rewards")


@reward_routes.route("/programs/<int:pid>")
def program_and_rewards_and_redeemed(pid):
    """Get a list of a program's custom rewards."""
    program = Program.query.get(pid)
    rewards = Reward.query.filter(Reward.program_id == pid).all()
    redeemed = Redeemed.query.join(Redeemed.reward) \
        .filter(Redeemed.user_id == current_user.id, Reward.program_id == pid) \
        .order_by(Redeemed.redeemed_at).all()

    return jsonify(
        program_data=program.to_dict_for_user(current_user.id), 
        rewards_data={r.id:r.to_dict() for r in rewards},
        redeemed_data={r.id:r.to_dict() for r in redeemed})


@reward_routes.route("/programs/<int:pid>/rewards")
def program_rewards(pid):
    """Get a list of a program's custom rewards."""
    rewards = Reward.query.filter(Reward.program_id == pid).all()
    return [r.to_dict() for r in rewards]


@reward_routes.route("/programs/<int:pid>/create", methods=["POST"])
def create_reward(pid):
    form = RewardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    check_exists = lambda x: x if x else -1
    
    if form.validate():
        reward = Reward(title=form["title"].data,
                        type='custom',
                        description=form['description'].data,
                        color_id=form['cid'].data,
                        icon_id=form["iid"].data,
                        cost=form['cost'].data,
                        limit_per_member=check_exists(form['limit'].data),
                        quantity=check_exists(form['quantity'].data),
                        creator_id=request.json['userId'],
                        program_id=pid,)
        db.session.add(reward)
        db.session.commit()
            
        return reward.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@reward_routes.route("/<int:rid>/edit", methods=["PATCH"])
def edit_reward(rid):
    """Edit a reward by id."""
    form = RewardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    check_exists = lambda x: x if x else -1
    
    if form.validate():
        reward = Reward.query.options(joinedload(Reward.color), joinedload(Reward.icon)).get(rid)
        reward.title = form["title"].data
        reward.description = form["description"].data
        reward.cost = form["cost"].data
        reward.quantity = check_exists(form["quantity"].data)
        reward.limit_per_member = check_exists(form["limit"].data)
        reward.color_id = form["cid"].data
        reward.icon_id = form["iid"].data
        
        db.session.commit()
        return reward.to_dict()
    return {'errors':  validation_errors_to_error_messages(form.errors)}, 400


@reward_routes.route("/<int:rid>/delete", methods=["DELETE"])
def delete_reward(rid):
    """Delete a reward by id."""
    reward = Reward.query.get(rid)
    db.session.delete(reward)
    db.session.commit()
    return "The reward has been smited D:"


@reward_routes.route("/<int:rid>/memberships/<int:mid>/redeem")
def redeem_reward(rid, mid):
    """Redeem a reward for a member."""
    reward = Reward.query.filter(Reward.id == rid).one()
    membership = Membership.query.filter(Membership.id == mid).one()
    
    if reward.limit_per_member > 0:
        redeemed_count = Redeemed.query.filter(Redeemed.reward_id == reward.id, Redeemed.user_id == membership.member.id).count()
        if redeemed_count >= reward.limit_per_member:
            return {'errors': [f"You have too many, sorry T_T . Only {str(reward.limit_per_member)} per customer!"]}, 400

    if reward.quantity == 0:
        return {'errors': ["There aren't any left, sorry T_T"]}, 400
    
    if membership.points < reward.cost:
        return {'errors': ["You need more points please TT_TT"]}, 400

    if reward.quantity > 0:
        reward.quantity -= 1

    membership.points -= reward.cost
    redeemed = Redeemed(user_id=membership.member_id,
                        reward_id=reward.id,
                        title=reward.title,
                        description=reward.description,
                        color_id=reward.color_id,
                        icon_id=reward.icon_id,
                        cost=reward.cost,
                        program_id=reward.program_id,
                        )
    db.session.add(redeemed)
    db.session.commit()

    return jsonify(redeemed_data=redeemed.to_dict())
    
    
@reward_routes.route("/programs/<int:pid>/users/<int:uid>/redeemed")
def redeemed_rewards(pid, uid):
    """Get a list of a user's redeemed rewards, ordered by redeemed_at dates."""
    redeemed = Redeemed.query.join(Redeemed.reward) \
      .filter(Redeemed.user_id == uid, Reward.program_id == pid) \
      .order_by(Redeemed.redeemed_at).all()
    
    return [r.to_dict() for r in redeemed]