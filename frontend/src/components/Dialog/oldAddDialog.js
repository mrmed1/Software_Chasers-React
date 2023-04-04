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
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddDialog = ({ open, onClose, onSubmit, title, attributes }) => {
  const initialState = Object.fromEntries(
    attributes.map((attr) => [
      attr.name,
      attr.type === "checkbox" ? false : attr.type === "date" ? null : "",
    ])
  );

  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    if (type === "date") {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
    }
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
      {attributes.map((attr) => (
          !attr.onlyDetails &&
          attr.type === "text" && (
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
          )
        ))}
          {attributes.map((attr) => (
          !attr.onlyDetails &&
          attr.type === "checkbox" && (
            <LocalizationProvider key={attr.name} dateAdapter={AdapterDateFns}>
              <DatePicker
               
                name={attr.name}
                value={values[attr.name] || null}
                onChange={(date) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    [attr.name]: date,
                  }))
                }
              />
            </LocalizationProvider>
          )
        ))}
        {attributes.map((attr) => (
          !attr.onlyDetails &&
          attr.type === "checkbox" && (
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
          )
        ))}
      
     
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
