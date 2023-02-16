from backend.models import db, Reward

def seed_rewards():

    rewardOne = Reward(title="go out for ice cream",
                       description="free ice cream",
                       cost=5,
                       color_id=5,
                       limit_per_member=-1,
                       quantity=5,
                       icon_id=29,
                       program_id=2,
                       creator_id=1,
                       type="custom",
                       )
    rewardThree = Reward(title="new bike",
                         description="john promises to buy a new bike",
                         cost=100,
                         color_id=21,
                         limit_per_member=1,
                         quantity=1,
                         icon_id=23,
                         program_id=2,
                         creator_id=1,
                         type="custom",
                         )
    rewardTwo = Reward(title="bowling night",
                       description="bowling with the boizzz",
                       cost=7,
                       color_id=9,
                       limit_per_member=2,
                       quantity=2,
                       icon_id=15,
                       program_id=2,
                       creator_id=1,
                       type="custom",
                       )
    rewardFour = Reward(title="trip to the casino",
                        description="with robert, lyn, and rita",
                        cost=25,
                        color_id=6,
                        limit_per_member=1,
                        quantity=1,
                        icon_id=11,
                        program_id=2,
                        creator_id=1,
                        type="custom",
                        )
                        
    rewards = [rewardOne, rewardTwo, rewardThree, rewardFour]
    
    for reward in rewards:
        db.session.add(reward)


    db.session.commit()

def undo_rewards():
    db.session.execute('ALTER SEQUENCE rewards_id_seq RESTART WITH 1')
    db.session.execute('TRUNCATE rewards CASCADE;')
    db.session.commit()
