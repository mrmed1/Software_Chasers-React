import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditDialog = ({ open, onClose, entity, onSave ,attributes,title}) => {
  const [entityData, setEntityData] = useState({});

  useEffect(() => {
    if (entity) {
      setEntityData(entity);
    } else {
      setEntityData({});
    }
  }, [entity]);

  const handleSave = () => {
    onSave(entityData._id,entityData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleFieldChange = (event) => {
    setEntityData({
      ...entityData,
      [event.target.id]: event.target.value,
    });
  };

  const renderFields = () => {
    const fields = [];
    attributes.map((attribute) => (
      fields.push(
        !attribute.onlyDetails &&  <TextField
          key={attribute.name}
          margin="dense"
          id={attribute.name}
          label={attribute.name}
          type="text"
          fullWidth
          multiline={attribute.multiline}
          minRows={attribute.minRows}
          maxRows={attribute.minRows}
          value={entityData[attribute.name] || ""}
          onChange={handleFieldChange}
        />
      )
    ));
    return fields;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {title}</DialogTitle>
      <DialogContent>{renderFields()}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
