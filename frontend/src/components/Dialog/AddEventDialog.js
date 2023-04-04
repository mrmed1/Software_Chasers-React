import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddEventDialog = ({ open, onClose, addEvent }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleTypeChange = (event) => setType(event.target.value);

  const handleAddClick = () => {
    addEvent({ name, type, description });
    setName("");
    setDescription("");
    setType("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Type"
          type="text"
          value={type}
          onChange={handleTypeChange}
          fullWidth
        />

        <TextField
          margin="dense"
          label="Description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          multiline
          minRows={3}
          maxRows={6}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddClick} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventDialog;
