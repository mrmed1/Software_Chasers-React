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
  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        {selectedData &&
          attributes.map(
            (attribute) =>
              attribute.detailsAttribute && (
                <div key={attribute.name}>
                  <Typography variant="subtitle1">
                    {attribute.label} :
                  </Typography>

                  {!attribute.object && attribute.type === "date" ? (
                    <Typography>
                      {new Date(
                        selectedData[attribute.name]
                      ).toLocaleDateString()}
                    </Typography>
                  ) : attribute.type === "multiSelect" ? (
                    <Typography>
                      {selectedData[attribute.name]?.map((id) => (
                        <span key={id}>{getLabelById(id)} </span>  
                      ))}
                    </Typography>
                  ) : (
                    <Typography>{selectedData[attribute.name]} </Typography>
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
