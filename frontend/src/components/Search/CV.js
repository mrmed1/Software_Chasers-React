import React, { useEffect ,useState } from "react";
import Experience from "./Experience";
import Education from "./Education";
import Internships from "./Internships";
import Skills from "./Skills";
import { useQuery } from "react-query";
import { getCvByIdOfOwner  } from "../../Service/studentService";
import {connectedUser} from "../../Service/auth.service";
import { fetchInternshipsByStudentId } from "../../Service/internshipService";
 
import { useMediaQuery, useTheme } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps  } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./cv.css"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CV({Mode, open, onClose, name,id }) {

  const [data, setData] = useState();
  const [InternshipsList, setInternshipsList] = useState();

 
 

  useEffect(() => {
    async function fetchData() {
      try {
         if(open){
        const res = await getCvByIdOfOwner(id);
        const internshipsList = await fetchInternshipsByStudentId(res.InternshipsList);
        console.log("internshipsList",internshipsList)
        setData(res);
        setInternshipsList(internshipsList);
       
        console.log(res);
      }
      } catch (e) {
          console.log(e);
      }
    }
    fetchData();
  }, [open]);
 
 

  
  return (
    <Dialog    fullScreen
     open={open} onClose={onClose}   TransitionComponent={Transition} aria-labelledby="form-dialog-title">
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {name}
            </Typography>
            <Button autoFocus color="inherit" onClick={onClose}>
              done
            </Button>
          </Toolbar>
        </AppBar>
 
    <DialogContent sx={{  margin: '0 auto', width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}  >
    {data?.experience &&data?.education&&data?.Skills  ? (
  <div>
    {data?.experience && <Experience data={data.experience} _id={data._id} style={Mode} />}
    {data?.education && <Education data={data.education} _id={data._id} style={Mode} />}
    {InternshipsList && <Internships data={InternshipsList} style={Mode} />}
    {data?.Skills && <Skills data={data.Skills} _id={data._id} style={Mode} />}
  </div>
) : (
  <div>Did not create CV yet</div>
)}

    </DialogContent>
 
    </Dialog>
  );
}
