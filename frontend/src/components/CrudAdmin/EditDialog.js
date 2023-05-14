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
import {
 
  Dropdown,
 
} from "semantic-ui-react";
import Autocomplete from "@mui/material/Autocomplete";

const EditDialog = ({ open, onClose, entity, onSave, attributes, title }) => {
  const [entityData, setEntityData] = useState(entity);
  const [accessData, setAccessData] = useState([]);
  const today = new Date().toISOString().slice(0, 10); // get the current date in yyyy-mm-dd format
  console.log('entityData',entityData)
  // Function to get the label based on the ID
const getLabelById = (id) => {
  const option = data.find((item) => item.id === id);
  return option ? option.label : "";
};

// Updated list of options
const data = [
  { id: "MANAGESTUDENTS", label: "Manage Students" },
  { id: "MANAGETEACHERS", label: "Manage Teachers" },
  { id: "MANAGECLUBS", label: "Manage Clubs" },
  { id: "MANAGEEVENTS", label: "Manage Events" },
  { id: "MANAGEINTERNSHIPS", label: "Manage Internships" },
];
useEffect(() => {
  if (entity) {
    setEntityData(entity);
    const access = entityData['access'].map((item) => ({ id: item, label: getLabelById(item) }));
    setAccessData(access);
    console.log(accessData);
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
  
  const handleDropdownChange=(event,value)=>{
    const multiSelect =  value.map(select => {
      return select.id;});
      console.log(value);
    
      setEntityData({...entityData, ['access']: multiSelect });
  }
  

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
                      
                    />
                  }
                  label={attr.label}
                />
              </FormControl>
            ): attr.type === "multiSelect" ?(
              
              <Autocomplete
              multiple
              limitTags={3}
              id="multiple-limit-tags"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={attr.data}
              name='access'
              getOptionLabel={(option) => option.label || ""}
              value={entityData['access']&&entityData['access'].map((item) => ({ id: item, label: getLabelById(item) }))}
              sx={{ marginY: 1 }}
              onChange={handleDropdownChange}
              renderInput={(params) => (
                <TextField {...params} label={attr.label} placeholder={attr.label} key={attr.id} name='access' fullWidth/>
              )}
            />
      
                
            ): (
              
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
