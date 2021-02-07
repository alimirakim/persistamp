import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import OptionsContext from '../../context/OptionsContext'
import RewardEditForm from '../forms/RewardEditForm'
import RewardDeleteForm from '../forms/RewardDeleteForm'
import RedeemForm from '../forms/RedeemForm'
import { EditButton } from '../forms/FormInputs'
import Divider from '../HomePage/Divider'


export default function RewardCard({ program, reward, receiptCount }) {
  const { mid } = useParams()
  const { colors, icons } = useContext(OptionsContext)
  const isBlack = reward.cid === 3 ? "rsc-black" : ""
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openRedeem, setOpenRedeem] = useState(false)
  let insufficientPoints = program.points < reward.cost
  let remainingLimit = reward.limit_per_member - receiptCount
  let disabled = insufficientPoints || remainingLimit === 0 || reward.quantity === 0
  const disabledStyle = disabled ? { color: "red" } : {}

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)
  const toggleRedeem = (e) => setOpenRedeem(!openRedeem)

  const remainingRatio = () => {
    if (reward.limit_per_member > -1) {
      return `${remainingLimit} / ${reward.limit_per_member}`
    }
    return "--"
  }

  return (
    <article>
      <RewardEditForm open={openEdit} handleClose={toggleEdit} reward={reward} handleOpenDelete={toggleDelete} />
      <RewardDeleteForm open={openDelete} handleClose={toggleDelete} reward={reward} />
      <RedeemForm open={openRedeem} handleClose={toggleRedeem} reward={reward} mid={mid} />

      <div className={`rsc th-card-shadow ${isBlack}`} style={{ background: `linear-gradient(-45deg, rgb(20,10,0) -100%, ${colors[reward.cid].hex}, rgb(255,255,255) 200%` }}>
        <div className="th-stripe-overlay"></div>
        <div className={`th-inner-border ${isBlack}`}>
          <i className={`rsc-bg-icon fas fa-5x rev fa-${icons[reward.iid].title}`} style={{color: colors[reward.cid].hex}}></i>

          <div className="lo-top-left">
            <EditButton handleOpen={toggleEdit} styles={isBlack} />
          </div>
          <h3 className="lo-align-cen">
            <i className={`fas fa-${icons[reward.iid].title}`}></i>
            &nbsp;&nbsp;{reward.title}
          </h3>

          <Divider icon={icons[reward.iid].title} line="long" />

          {reward.description &&
            <blockquote className="rsc-desc th-quote">{reward.description}</blockquote>
          }
          {!reward.description && <br/>}

          <dl className="th-dl-oneline" style={{ textAlign: "center" }}>
            {/* <dt>Limit Per Member:</dt> */}
            {/* <dd>{remainingRatio()}</dd> */}
            {/* <br/> */}
            {/* <dt>Cost:</dt> */}
            {/* <dd>{reward.cost} <i className={`fas fa-${icons[reward.iid].title}`}></i></dd> */}
          </dl>
          <button onClick={toggleRedeem} className="rsp-btn" disabled={disabled}>
            <span style={disabledStyle}>Redeem ({reward.cost} <small>Points</small>)</span>
          </button>
          <br />
          <br />

          <section className="rsc-meta">
            <small>
              <dl className="th-dl-oneline lo-row-fill">
                <div>
                  <dt>ID: </dt>
                  <dd>{reward.id}</dd>
                </div>

                <div>
                  <dt>Created: </dt>
                  <dd>{new Date(reward.created_at).toLocaleString('en-EN', { year: 'numeric', month: 'short', day: 'numeric' })}</dd>
                </div>

                <div><dt>Last Receipt: </dt>
                  {reward.last_created_at &&
                    <dd>{new Date(reward.last_created_at).toLocaleString('en-EN', { dateStyle: "short" })}
                    </dd>
                  }
                  {!reward.last_created_at && <dd> never</dd>}
                </div>

                <div>
                  <dt>Used: </dt>
                  <dd>{reward.receipts_count}x</dd>
                </div>

                <div>
                  <dt>Quantity: </dt>
                  <dd>{reward.quantity > -1 ? reward.quantity : "--"}</dd>
                </div>

              </dl>
            </small>
          </section>


        </div>
      </div>

    </article>
  )
}