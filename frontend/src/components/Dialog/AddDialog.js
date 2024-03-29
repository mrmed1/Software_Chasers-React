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


const AddDialog = ({ open, onClose, onSubmit, title, attributes }) => {
  const today = new Date().toISOString().slice(0, 10);

  const initialState = Object.fromEntries(
    attributes.map((attr) => [
      attr.name,
      attr.type === "checkbox" ? false : attr.type === "date" ? today : "",
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

  const handleSubmit = async () => {
    await onSubmit(values);
    setValues(initialState);
    onClose();
  };

  return (
    <Dialog id="AddDialog" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
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
                          data-test={attr.name}
                        />
                      }
                      label={attr.label}
                    />
                  </FormControl>
                ) : (
                  <TextField
                  data-test={attr.name}
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
        <Button 
          data-test="cancel-button"
        onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
         data-test="add-button"
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
