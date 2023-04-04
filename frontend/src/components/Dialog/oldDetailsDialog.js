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
  FormControlLabel
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CheckBox } from "@mui/icons-material";

const AddDialog = ({ open, onClose, onSubmit, title, attributes }) => {
  const [checked, setChecked] = React.useState(false);
  const initialState = Object.fromEntries(
    attributes.map((attr) => [
      attr.name,
      attr.type === "checkbox" ? false : "",
    ])
  );
  
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
  };

  const handleSubmit = () => {
    
    onSubmit(values);
    setValues(initialState);
    onClose();
  };
 
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {attributes.map(
          (attr) =>
            (!attr.onlyDetails && attr.type === "checkbox" && (
              <>
                <FormControl component="fieldset" key={attr.name}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values[attr.name]}
                      onChange={handleChange}
                      name={attr.name}
                      color="primary"
                    />
                  }
                  label={attr.label}
                />
              </FormControl>
              </>
            )) ||
            (!attr.onlyDetails && attr.type == "date" && (
                <DatePicker label={attr.label} />
           
            ))
            ||
            (!attr.onlyDetails && attr.type !== "checkbox" && attr.type !== "date" && (
              <TextField
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
            ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddDialog;
