import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function EventDetails({ open, onClose, event }) {
  const [scroll, setScroll] = React.useState("paper");

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"> {event.name}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {new Date(event.eventDate).toLocaleDateString()}
            </Typography>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
         
            {event.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {event.endDate && <Button onClick={handleClose}>Subscribe</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
