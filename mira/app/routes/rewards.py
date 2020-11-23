from flask import Blueprint, render_template, redirect, jsonify, request
from app.models import Reward, Redeemed
from app.schemas import reward_schema, redeemed_schema
from app.utils import dump_data_list

rewards = Blueprint("rewards", __name__, url_prefix="/rewards")


@rewards.route("/<string:type>")
def type_rewards(type):
    """Get a list of all default-universal rewards, by type if specified."""
    if type:
        rewards = Reward.query.filter(Reward.type == type).all()
    else:
        rewards = Reward.query.filter(Reward.typ != 'custom').all()
    return jsonify(dump_data_list(rewards, reward_schema))


@rewards.route("/programs/<int:pid>", methods=["POST"])
def create_reward(pid):
    # """Create a custom reward for a program."""
    # reward = Reward(reward=,
    #                 type=,
    #                 description=,
    #                 cost=,
    #                 quantity=,
    #                 limit_per_member=,
    #                 color=,
    #                 stamp_id=,
    #                 program_id=,
    #                 creator_id=,)
    # db.session.add(reward)
    db.session.commit()
    return jsonify(reward_schema.dump(reward))


@rewards.route("/<int:rid>", methods=["PATCH"])
def edit_reward(rid):
    """Edit a reward by id."""
    reward = Reward.query.filter(Reward.id == rid).one()
    # reward.reward = 
    # reward.type = 
    # reward.description = 
    # reward.cost = 
    # reward.quantity = 
    # reward.limit_per_member = 
    # reward.color = 
    # reward.stamp_id = 
    # reward.program_id = 
    # reward.creator_id = 
    db.session.commit()
    return jsonify(reward_schema.dump(reward))


@rewards.route("/<int:rid>", methods=["DELETE"])
def delete_reward(rid):
    """Delete a reward by id."""
    reward = Reward.query.filter(Reward.id == rid).one()
    db.session.delete(reward)
    db.session.commit()
    return "The reward has been smited D:"


@rewards.route("/<int:rid>/redeem/members/<int:mid>")
def redeem_reward(rid, mid):
    """Redeem a reward for a member."""
    reward = Reward.query.filter(Reward.id == rid).one()
    member = Member.query.filter(Member.id == mid).one()
    # TODO Add a check for if the member's redeemed rewards list has below the
    # limit_per_member of the reward
    if reward.quantity > 0:
        reward.quantity -= 1
        redeemed = Redeemed(user_id=member.member_id,
                            reward_id=reward.id,)
        db.session.add(redeemed)
        db.session.commit()
        return jsonify(redeemed_schema.dump(redeemed))
    else:
        return "There aren't any left, sorry T_T"
