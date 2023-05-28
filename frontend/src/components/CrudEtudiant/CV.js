import React, { useEffect ,useState } from "react";
import Experience from "./Experience";
import Education from "./Education";
import Internships from "./Internships";
import Skills from "./Skills";
import { useQuery } from "react-query";
import {fetchMyEvents, getCvByIdOfOwner  } from "../../Service/studentService";
import {connectedUser} from "../../Service/auth.service";
import { fetchInternshipsByStudentId } from "../../Service/internshipService";
 
import { useMediaQuery, useTheme } from '@mui/material';
import EventClubDetails from "./EventClubDetails";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps  } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [myEvent, setMyEvent] = useState([])
 
 

  useEffect(() => {
    async function fetchData() {
      try {
        
         if(open){
          setLoading(true);
          fetchMyEvents(id).then((r)=>{
            setMyEvent(r)
          
          })
          
          const res = await getCvByIdOfOwner(id);
        const internshipsList = await fetchInternshipsByStudentId(id);
        console.log("internshipsList",internshipsList)
        setData(res);
        setInternshipsList(internshipsList);
       
        console.log(res);
        setLoading(false);
      }
      } catch (e) {
        setLoading(false);
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

      <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {loading && <div>Loading</div>}
      {!loading && (<>
    {data?.experience &&data?.education&&data?.Skills  ? (
  <div>
    {data?.experience && <Experience data={data.experience} _id={data._id} style={Mode} />}
    {data?.education && <Education data={data.education} _id={data._id} style={Mode} />}
    {InternshipsList && <Internships data={InternshipsList} style={Mode} />}
    {data?.Skills && <Skills data={data.Skills} _id={data._id} style={Mode} />}
       
    {myEvent?.map((EV,index)=>{
        return(<div key={index}>
            <EventClubDetails style={Mode} event={EV} id={id}/> <br/>
        </div>
        )
      })}   
     
  </div>
) : (<>
  <div>Did not create CV yet</div>
  {data?.experience &&data?.education&&data?.Skills  ? (
    <>
{InternshipsList && <Internships data={InternshipsList} style={Mode} />}
{data?.Skills && <Skills data={data.Skills} _id={data._id} style={Mode} />}
</>
  ):(<></>)}
  
  </>
)}
</>)}
</>

    </DialogContent>
 
    </Dialog>
  );
}
