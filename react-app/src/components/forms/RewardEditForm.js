

export default function RewardEditForm({ program, reward, dispatchRewards }) {
  const { colors, icons } = useContext(OptionsContext)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(reward.reward)
  const [description, setDescription] = useState(reward.description)
  const [color, setColor] = useState(reward.color.id)
  const [icon, setIcon] = useState(reward.icon.id)
  const [cost, setCost] = useState(reward.cost)
  const [limit, setLimit] = useState(reward.limit_per_member)
  const [quantity, setQuantity] = useState(reward.quantity)
  console.log("reward to edit!", title, description, color, icon, cost, limit, quantity)
  // console.log("reward to edit!", reward)

  // if (reward.quantity == "∞") setQuantity(-1) 
  // if (reward.limit_per_member == "∞") setLimit(-1)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onEdit = async (e) => {
    e.preventDefault()
    setOpen(false)
    if (typeof limit !== "number") setLimit(-1)
    if (typeof quantity !== "number") setQuantity(-1)
    const res = await fetch(`/api/rewards/${reward.id}/edit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reward: title,
        description,
        color,
        icon,
        cost,
        limit,
        quantity,
      })
    })
    console.log("REWARD MADE?", res)
    const reward_data = await res.json()
    dispatchRewards(editReward(reward_data))
    console.log("new reward!", reward_data)
  }

  return (
    <article>
      <button onClick={handleOpen} style={{ borderWidth: 0, backgroundColor: "rgba(0,0,0,0", color: "white" }}>

        <i className={`fas fa-pencil-alt`}></i>


      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit reward "{reward.reward}" for "{program.title}"!</DialogTitle>
        <DialogContent>

          <AddTitle title={title} setTitle={setTitle} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseIcon icons={icons} icon={icon} setIcon={setIcon} color={color} />
          <ChooseCost cost={cost} setCost={setCost} />
          <ChooseLimit limit={limit} setLimit={setLimit} />
          <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onEdit} action={"Save"} />
        </DialogContent>
      </Dialog>

    </article>
  )
}
