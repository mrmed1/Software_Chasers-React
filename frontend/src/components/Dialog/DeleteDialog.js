import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const DeleteDialog = ({ open, onClose, selectedEntity, deleteEntity,title }) => {
  const handleConfirmDelete = () => {
    deleteEntity(selectedEntity);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog id="DeleteDialog" open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {title} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
            data-test="cancel-button"
        onClick={handleCancel}>Cancel</Button>
        <Button
          data-test="delete-button"
        onClick={handleConfirmDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog ;
