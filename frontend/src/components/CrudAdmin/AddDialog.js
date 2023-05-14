import React, { useState } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";

const AddDialog = ({ open, onClose, onSubmit, title, attributes }) => {
  const today = new Date().toISOString().slice(0, 10);

  const initialState = Object.fromEntries(
    attributes.map((attr) => [
      attr.name,
      attr.type === "checkbox" ? false : attr.type === "date" ? today :attr.type === "multiSelect" ? [] : "",
    ])
  );

  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value, type, checked, } = event.target;

 

    const newValue = type === "checkbox" ? checked : value;
    if (type === "date") {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
    
 
    else {
      setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
    }
  };

  const handleSubmit = async () => {
    await onSubmit(values);
    setValues(initialState);
    onClose();
  };
  const handlAccessSelection=(event,value) => {
    const multiSelect =  value.map(select => {
      return select.id;});
    
      setValues((prevValues) => ({ ...prevValues, ['access']: multiSelect }));
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {attributes.map(
          (attr) =>
            attr.addAttribute && (
              <>
                {attr.type === "checkbox" ? (
                  <FormControl component="fieldset" key={attr.name}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values[attr.name]}
                          onChange={handleChange}
                          name={attr.name}
                          color="primary"
                          value={values[attr.name]}
                        />
                      }
                      label={attr.label}
                    />
                  </FormControl>
                ):( attr.type === "multiSelect") ?(
                  <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={attr.data}
                  name='access'
                  getOptionLabel={(option) => option?.label || ""}
                  
                  value={attr.data.label}
  
                  sx={{marginY:1}}
                  onChange={handlAccessSelection}
                  renderInput={(params) => (

                      <TextField {...params} label={attr.label} placeholder={attr.label}    name='access'  fullWidth/>
                  )}
                  
              />
                  
                ): (
                  <TextField
                    required={attr.required}
                    key={attr.id}
                    margin="dense"
                    label={attr.label}
                    type={attr.type}
                    name={attr.name}
                    value={values[attr.name]}
                    onChange={handleChange}
                    fullWidth
                    multiline={attr.multiline}
                    minRows={attr.minRows}
                    maxRows={attr.maxRows}
                 
                  />
                )}
              </>
            )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={attributes.some(
            (attr) => attr.addAttribute && attr.required && !values[attr.name]
          )}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
