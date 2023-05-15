import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { addPrizeToEVENT } from "../../Service/studentService";
import { connectedUser } from "../../Service/auth.service";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import IconButton from "@mui/material/IconButton";


import React from 'react'
import { toast } from "react-hot-toast";

export default function AddPrize({idEvent, onPrizeChange}) {
    const [prizeInput, setPrizeInput] = React.useState("")
    const id = connectedUser()._id
    const [open, setOpen] = React.useState(false);

     const handleClickOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
     
     const addPrize=()=>{
        try {
           const  formdata = {
                prix:prizeInput
             }
             addPrizeToEVENT(idEvent,id,formdata).then(()=>{

                toast.success("Prize added!");
                onPrizeChange(prizeInput);
            })
        } catch (error) {
            toast.error("Prize added Failed ")
        }
     
        setOpen(false);
      }
  return (
    <div>
    <IconButton aria-label="settings" onClick={handleClickOpen}>
      <EmojiEventsIcon />
    </IconButton>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"You want to add a prize ?"}
      </DialogTitle>
      <br/>
      <DialogContent>
    
          <TextField
            id="outlined-controlled"
            label="Prize"
            value={prizeInput}
            onChange={(e)=>setPrizeInput(e.target.value)}
           
          
          />
     
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={addPrize} autoFocus>
          Add prize
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}
