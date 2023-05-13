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
          attributes.map(
            (attribute) =>
              attribute.detailsAttribute && (
                <div key={attribute.name}>
                  {!attribute.object && attribute.type === "date" ? (
                    <>
                      <Typography variant="subtitle1">
                        {attribute.label} :
                      </Typography>
                      <Typography>
                        {new Date(
                          selectedData[attribute.name]
                        ).toLocaleDateString()}
                      </Typography>
                    </>
                  ) : attribute.type === "button" ? (
                    <Button variant="outlined">Show Participants</Button>
                  ) : (
                    <>
                      <Typography variant="subtitle1">
                        {attribute.label} :
                      </Typography>
                      <Typography>{selectedData[attribute.name]} </Typography>
                    </>
                  )}

                  <br></br>
                </div>
              )
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
