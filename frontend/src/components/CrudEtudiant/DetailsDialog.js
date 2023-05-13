import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const DetailsDialog = ({ open, onClose, selectedData }) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        <div key='Name '>
              <Typography variant="subtitle1">Name :</Typography>

                <Typography>{selectedData['firstname']} {selectedData['lastname']} </Typography>
          
              <br></br>
            </div>
           
            <div key='email'>
              <Typography variant="subtitle1">Email :</Typography>

                <Typography>{selectedData['email']}</Typography>
          
              <br></br>
            </div>
            <div key='Level'>
              <Typography variant="subtitle1">Level :</Typography>

                <Typography>{selectedData['level']}</Typography>
          
              <br></br>
            </div>
            <div key='class'>
              <Typography variant="subtitle1">Class :</Typography>

                <Typography>{selectedData['class']}</Typography>
          
              <br></br>
            </div>
            <div key='phone'>
              <Typography variant="subtitle1">Phone :</Typography>

                <Typography>{selectedData['phone']}</Typography>
              <br></br>
            </div>
            <div key='dob'>
              <Typography variant="subtitle1">Date of Birth :</Typography>

              <Typography>
                  {new Date(selectedData['dob']).toLocaleDateString()}
                </Typography>

            </div>
          
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
