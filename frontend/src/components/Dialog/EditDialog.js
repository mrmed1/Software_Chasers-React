import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";

const EditDialog = ({ open, onClose, entity, onSave, attributes, title }) => {
  const [entityData, setEntityData] = useState(entity);
  const today = new Date().toISOString().slice(0, 10); // get the current date in yyyy-mm-dd format

  useEffect(() => {
    if (entity) {
      setEntityData(entity);
    } else {
      setEntityData({});
    }
  }, [entity]);
  
  const handleSave = () => {
    onSave(entityData._id, entityData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  const handleFieldChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    setEntityData({
      ...entityData,
      [name]: value,
    });
  };
  
  

  const renderFields = () => {
    const fields = [];
    attributes.map((attr) =>
      fields.push(
        attr.editAttribute && (
          <>
            { attr.type === "checkbox" ? (
              <FormControl component="fieldset" key={attr.name}>
                <FormControlLabel
                  control={
                    <Checkbox
                    checked={entityData[attr.name] ? entityData[attr.name] : false}
                      onChange={handleFieldChange}
                      name={attr.name}
                      color="primary"
                      data-test={attr.name}
                      
                    />
                  }
                  label={attr.label}
                />
              </FormControl>
            ) : (
              
              <TextField
              data-test={attr.name}
                key={attr.name}
                margin="dense"
                id={attr.name}
                name={attr.name}
                label={attr.name}
                type={attr.type}
                fullWidth
                multiline={attr.multiline}
                minRows={attr.minRows}
                maxRows={attr.minRows}
                value={
                  attr.type === "date"
                    ?(entityData[attr.name]?
                      new Date(entityData[attr.name]).toISOString().slice(0, 10): today
                    ) 
                    : entityData[attr.name]
                }  onChange={handleFieldChange}
              />
            )}
          </>
        )
      )
    );
    return fields;
  };

  return (
    <Dialog id="EditDialog" open={open} onClose={onClose}>
      <DialogTitle>Edit {title}</DialogTitle>
      <DialogContent>{renderFields()}</DialogContent>
      <DialogActions>
        <Button   data-test="cancel-button" onClick={handleCancel}>Cancel</Button>
        <Button   data-test="save-button" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
