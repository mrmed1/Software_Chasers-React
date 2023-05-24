import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { connectedUser } from "../../Service/auth.service";
import { Toaster, toast } from "react-hot-toast";
import { participateInEvents } from "../../Service/studentService";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";


export default function EventDetails({ open, onClose, event }) {
  const [scroll, setScroll] = React.useState("paper");
  const id = connectedUser()._id

  const handleClose = () => {
 
    onClose();
   
  };
  const handleSubscribe = () => {
    try {
      participateInEvents(event._id, id)
        .then((r) => {
          console.log(r);
          toast.success("Subscribed to this event !");
          onClose();
        })
        .catch((error) => {
          console.log('error',error)
          toast.error(error?.response?.data?.error);
          onClose();
        });
    } catch (error) {
      toast.error("Subscription Failed");
      onClose();
    }
  };
  function convertDate(dateString) {
    if(dateString){
        const dateObj = new Date(dateString);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        return formattedDate;
    }
  
  }

  return (
    <div>
      <Toaster/>
      <Dialog
      
open={open}

aria-labelledby="scroll-dialog-title"
aria-describedby="scroll-dialog-description"

>
<DialogTitle id="scroll-dialog-title">Event Details</DialogTitle>
<DialogContent>
  <Card centered sx={{width:400}}>
    <CardHeader
      title={<div>Event :{event?.name}</div>}
      
      subheader={
        event.endDate? (<div>
          From {convertDate(event?.startDate)} to{" "}
          {convertDate(event?.endDate)}
          <br />
          Domaine : {event?.domain}
          <br />
          {event?.numberOfPlaces} place availables
          <br />
          📌 At {event?.location}
        </div>):(<div> Date :  {convertDate(event?.eventDate)}</div>)
      }
    />

    <CardContent>
      <Typography variant="body2">
        {event?.description}
        {event.endDate &&   <>
        <br />
        <br />
        🔗 <a href={event?.link}> Event URL :</a>
        </>}
      </Typography>
      {event.endDate &&  <Typography>
        © Organized by Club {event?.club_id?.name}
        <br />
      </Typography>}
    </CardContent>
    

  </Card>
</DialogContent>
<DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {event.endDate && <Button onClick={handleSubscribe}>Subscribe</Button>}
        </DialogActions>
</Dialog>
    </div>
  );
}

