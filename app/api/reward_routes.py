from flask import Blueprint, render_template, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import current_user
from app.models import db, Reward, Receipt, Membership, Program
from app.schemas import reward_schema, receipt_schema, color_schema, icon_schema, user_schema, program_schema, membership_schema
from app.utils import dump_data_list, validation_errors_to_error_messages
from app.forms import RewardForm
from pprint import pprint

reward_routes = Blueprint("rewards", __name__, url_prefix="/rewards")


@reward_routes.route("/")
def user_rewards_and_receipts():
    """Get a list of a user's custom rewards."""
    print("\n\nCURRENT USER", current_user.is_authenticated)
    if current_user.is_authenticated:
        print("TYPES", isinstance(Reward.program_id, int))
        print(type(Receipt.program_id))
        rewards = Reward.query.filter(Reward.creator_id == current_user.id, isinstance(Reward.program_id, int) == False).all()
        receipts = Receipt.query.filter(Receipt.user_id == current_user.id, isinstance(Receipt.program_id, int)).order_by(Receipt.created_at).all()

        rewards = list(filter(lambda r: not isinstance(r.program_id, int), rewards))
        for r in rewards:
            print(isinstance(r.program_id, int))
        print("REWARDS?", rewards[0])
        return jsonify(
            points_data=current_user.points, 
            rewards_data={r.id:r.to_dict() for r in rewards},
            receipts_data={r.id:r.to_dict() for r in receipts})
    else:
        return None;

@reward_routes.route("/programs/<int:pid>")
def program_and_rewards_and_receipts(pid):
    """Get a list of a program's custom rewards."""
    program = Program.query.get(pid)
    rewards = Reward.query.filter(Reward.program_id == pid).all()
    receipts = Receipt.query.join(Receipt.reward) \
        .filter(Receipt.user_id == current_user.id, Reward.program_id == pid) \
        .order_by(Receipt.created_at).all()

    return jsonify(
        program_data=program.to_dict_for_user(current_user.id), 
        rewards_data={r.id:r.to_dict() for r in rewards},
        receipts_data={r.id:r.to_dict() for r in receipts})


@reward_routes.route("/programs/<int:pid>/rewards")
def program_rewards(pid):
    """Get a list of a program's custom rewards."""
    rewards = Reward.query.filter(Reward.program_id == pid).all()
    return [r.to_dict() for r in rewards]


@reward_routes.route("/programs/<int:pid>/create", methods=["POST"])
def create_program_reward(pid):
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

@reward_routes.route("/create", methods=["POST"])
def create_user_reward():
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
                        quantity=check_exists(form['quantity'].data),
                        creator_id=request.json['userId'],
                        )
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
def redeem_membership_reward(rid, mid):
    """Redeem a reward for a member."""
    reward = Reward.query.filter(Reward.id == rid).one()
    membership = Membership.query.filter(Membership.id == mid).one()
    
    if reward.limit_per_member > 0:
        receipts_count = Receipt.query.filter(Receipt.reward_id == reward.id, Receipt.user_id == membership.member.id).count()
        if receipts_count >= reward.limit_per_member:
            return {'errors': [f"You have too many, sorry T_T . Only {str(reward.limit_per_member)} per customer!"]}, 400

    if reward.quantity == 0:
        return {'errors': ["There aren't any left, sorry T_T"]}, 400
    
    if membership.points < reward.cost:
        return {'errors': ["You need more points please TT_TT"]}, 400

    if reward.quantity > 0:
        reward.quantity -= 1

    membership.points -= reward.cost
    receipt = Receipt(user_id=membership.member_id,
                        reward_id=reward.id,
                        title=reward.title,
                        description=reward.description,
                        color_id=reward.color_id,
                        icon_id=reward.icon_id,
                        value=reward.cost,
                        program_id=reward.program_id,
                        )
    db.session.add(receipt)
    db.session.commit()

    return jsonify(receipt_data=receipt.to_dict())

@reward_routes.route("/<int:rid>/redeem")
def redeem_user_reward(rid):
    """Redeem a reward for a user from their personal reward shop."""
    reward = Reward.query.filter(Reward.id == rid).one()
    
    if reward.quantity == 0:
        return {'errors': ["There aren't any left, sorry T_T"]}, 400
    
    if current_user.points < reward.cost:
        return {'errors': ["You need more points please TT_TT"]}, 400

    if reward.quantity > 0:
        reward.quantity -= 1

    current_user.points -= reward.cost
    receipt = Receipt(user_id=current_user.id,
                        reward_id=reward.id,
                        title=reward.title,
                        description=reward.description,
                        color_id=reward.color_id,
                        icon_id=reward.icon_id,
                        value=reward.cost,
                        program_id=reward.program_id,
                        )
    db.session.add(receipt)
    db.session.commit()

    return jsonify(receipt_data=receipt.to_dict())


@reward_routes.route("/programs/<int:pid>/users/<int:uid>/receipts")
def redeemed_rewards(pid, uid):
    """Get a list of a user's redeemed rewards, ordered by created_at dates."""
    receipts = Receipt.query.join(Receipt.reward) \
      .filter(Receipt.user_id == uid, Reward.program_id == pid) \
      .order_by(Receipt.created_at).all()
    
    return [r.to_dict() for r in receipts]
    
@reward_routes.route("/receipts")
def main_redeemed_rewards():
    """Get a list of a user's redeemed rewards, ordered by created_at dates."""
    receipts = Receipt.query.join(Receipt.reward) \
      .filter(Receipt.user_id == current_user.id, type(Reward.program_id) != 'int') \
      .order_by(Receipt.created_at).all()
    
    return [r.to_dict() for r in receipts]
