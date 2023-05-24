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
import { Dropdown } from "semantic-ui-react";
import Autocomplete from "@mui/material/Autocomplete";
import EditParticipants from "./EditParticipants";

const EditDialog = ({ open, onClose, entity, onSave, attributes, title }) => {
  const [entityData, setEntityData] = useState(entity);
  const [newParticipants, setNewParticipants] = useState(entity.participant);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10); // get the current date in yyyy-mm-dd format
  console.log("entityData", entityData);
  useEffect(() => {
    if (entity) {
      setEntityData(entity);
    } else {
      setEntityData({});
    }
  }, [entity]);

  const handleSave = () => {
    entityData.participant=newParticipants;
    console.log("entityData", entityData);
    onSave(entityData._id, entityData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  const handleFieldChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setEntityData({
      ...entityData,
      [name]: value,
    });
  };

  const handleDropdownChange = (event, value) => {
    const multiSelect = value.map((select) => {
      return select.id;
    });
    console.log(value);

    setEntityData({ ...entityData, ["access"]: multiSelect });
  };

  const handleParticipantEdit = (Data) => {
    setEditDialogOpen(true);
  };
  const handleEditParticipants = (Data) => {
    setNewParticipants(Data);
    setEditDialogOpen(false);
  };


  const renderFields = () => {
    const fields = [];
    attributes.map((attr) =>
      fields.push(
        attr.editAttribute && (
          <>
            {attr.type === "checkbox" ? (
              <FormControl component="fieldset" key={attr.name}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        entityData[attr.name] ? entityData[attr.name] : false
                      }
                      onChange={handleFieldChange}
                      name={attr.name}
                      color="primary"
                    />
                  }
                  label={attr.label}
                />
              </FormControl>
            ) : attr.type === "button" ? (
              <>
                <EditParticipants
                  open={editDialogOpen}
                  onClose={() => {
                    setEditDialogOpen(false);
                  }}
                  entity={entity}
                  onSave={handleEditParticipants}
                />
                <Button variant="outlined" onClick={handleParticipantEdit}>
                  Edit Participants
                </Button>
              </>
            ) : (
              <TextField
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
                }
                onChange={handleFieldChange}
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
        <Button  data-test="cancel-button" onClick={handleCancel}>Cancel</Button>
        <Button data-test="save-button" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
