import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const DetailsDialog = ({ open, onClose, selectedData, attributes }) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        {selectedData &&
          attributes.map((attribute) => (
            attribute.detailsAttribute&& <div key={attribute.name}>
              <Typography variant="subtitle1">{attribute.label} :</Typography>

              {!attribute.object && attribute.type === "date" ? (
                <Typography>
                  {new Date(selectedData[attribute.name]).toLocaleDateString()}
                </Typography>
              ) : (
                <Typography>{selectedData[attribute.name]}</Typography>
              )}

              {attribute.object && (
                <Typography>
                  {
                    selectedData[attribute.name.split(".")[0]][
                      attribute.name.split(".")[1]
                    ]
                  }
                </Typography>
              )}
              <br></br>
            </div>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
