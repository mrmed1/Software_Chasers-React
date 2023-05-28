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

import CV from "./CV";

const DetailsDialog = ({ open, onClose, selectedData }) => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showCv,setShowCv]=useState(false);
  const [openCv, setOpenCv] = useState(false);
  const handleCancel = () => {
    onClose();
  };
  const handleClose = () => {
    setOpenCv(false);
  };
  const darkMode = {
    card: { backgroundColor: "#23283e" },
    header: { color: "#cdcdff" },
    btn: { color: "#5bc0de " },
    text: { color: "#bdbddd" },
    text2: { color: "#f2f2f2" },
  };
  const lightMode = {
    card: { backgroundColor: "" },
    header: { color: "" },
    btn: { color: "" },
    text: { color: "black" },
    text2: { color: "" },
  };

  const handleShowAccount =(data)=>{

    console.log('Show Account clicked')
setSelectedName(selectedData.name);
setSelectedId(selectedData._id);

    setShowCv(true);
    setOpenCv(true);
  }
  return (
    <>    {showCv && <CV Mode={lightMode }  open={openCv} onClose={handleClose} name={selectedName} id={selectedId} />}
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        <div key='Name '>
              <Typography variant="subtitle1">Name :</Typography>

                <Typography>{selectedData['firstname']} {selectedData['lastname']} </Typography>
          
              <br></br>
            </div>
           
            <div key='email'>
              <Typography variant="subtitle1">Email :</Typography>

                <Typography>{selectedData['email']}</Typography>
          
              <br></br>
            </div>
            <div key='Level'>
              <Typography variant="subtitle1">Level :</Typography>

                <Typography>{selectedData['level']}</Typography>
          
              <br></br>
            </div>
            <div key='class'>
              <Typography variant="subtitle1">Class :</Typography>

                <Typography>{selectedData['class']}</Typography>
          
              <br></br>
            </div>
            <div key='phone'>
              <Typography variant="subtitle1">Phone :</Typography>

                <Typography>{selectedData['phone']}</Typography>
              <br></br>
            </div>
            <div key='dob'>
              <Typography variant="subtitle1">Date of Birth :</Typography>

              <Typography>
                  {new Date(selectedData['dob']).toLocaleDateString()}
                </Typography>

            </div>
            <br></br>
            <div key='showCv'>
            <Button variant="outlined" onClick={handleShowAccount}>
                  Show CV {selectedData['role']}
                </Button>

            </div>
          
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default DetailsDialog;
