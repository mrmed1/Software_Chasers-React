import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { toast } from "react-hot-toast";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EventClubDetailsC({ event }) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("item passed ", event);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
      <IconButton onClick={handleClickOpen("paper")}>
        <MoreHorizIcon color="primary" />
      </IconButton>
      <Dialog
      
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        
      >
        <DialogTitle id="scroll-dialog-title">Event Details</DialogTitle>
        <DialogContent>
          <Card centered sx={{minWidth:400}}>
            <CardHeader
              title={<div>Event :{event?.name}</div>}
              subheader={
                <div>
                  From {convertDate(event?.startDate)} to{" "}
                  {convertDate(event?.endDate)}
                  <br />
                  Domaine : {event?.domain}
                  <br />
                  {event?.numberOfPlaces} place availables
                  <br />
                  📌 At {event?.location}
                </div>
              }
            />

            <CardContent>
              <Typography variant="body2">
                {event?.description}
                <br />
                <br />
                🔗 <a href={event?.link}> Event URL :</a>
              </Typography>
              <Typography>
                © Organized by Club {event?.club_id?.name}
                <br />
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Participants:</Typography>
                <Typography paragraph>
                  {event?.participant?.map((person) => {
                    return (
                      <>
                        {`${person?.person?.firstname} ${person?.person?.lastname}`}{" "}
                        <p style={{ color: person?.status ==="pending"? "red" : "blue"}}>
                         {person?.status}... 
                        </p>{""}
                        〰{" "}
                      </>
                    );
                  })}

                  <br />
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
