import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import updateUser from '../services/user';

function UserSettings(){
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("")
  const user = useContext(UserContext)

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  const onUpdate = async (e) => {
    e.preventDefault()
    const updatedUser = updateUser(username)
    console.log(updatedUser)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Settings
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please fill out the following fields to start your new Habit!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            onChange={updateUsername}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{
            handleClose()
            onUpdate(e)
          }} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}