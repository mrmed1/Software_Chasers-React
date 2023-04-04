import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
 
} from "@mui/material";

const EditEventDialog = ({ open, onClose, selectedEditEvent, updateEvent }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedEditEvent) {
      setName(selectedEditEvent.name);
      setType(selectedEditEvent.type);
      setDescription(selectedEditEvent.description);
    } else {
      setName("");
      setType("");
      setDescription("");
    }
  }, [selectedEditEvent]);

  const handleSave = () => {
    const updatedEvent = {
      ...selectedEditEvent,
      name,
      type,
      description,
    };

    updateEvent(updatedEvent._id,updatedEvent);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          margin="dense"
          id="type"
          label="Type"
          type="text"
          fullWidth
          value={type}
          onChange={handleTypeChange}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          multiline
          minRows={3}
          maxRows={6}
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />

         
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventDialog;
