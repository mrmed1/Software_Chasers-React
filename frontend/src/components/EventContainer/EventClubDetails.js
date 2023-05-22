import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { connectedUser } from "../../Service/auth.service";
import AddPrize from "./AddPrize";
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

export default function EventClubDetails({ style,event }) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const id = connectedUser()._id

  const [prize, setPrize] = React.useState('');

  const handlePrizeChange = (newPrize) => {
    setPrize(newPrize);
  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  function getPrizename(event) {
    const participant = event.participant.find((p) => p.person === id);
    console.log("participant", event);
    if (participant && participant.person === id) {
      return participant.prix;
    }
  
    return prize;
  }
  
  React.useEffect(() => {
    setPrize(getPrizename(event));
  }, [event]);

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
    <Card centered fluid style={style.card}>
          
            <CardHeader
            action={
              <AddPrize idEvent={event?._id} onPrizeChange={handlePrizeChange}/>
            }
              title={<div style={style.text}>Event :{event?.name}</div>}
              subheader={
                <div style={style.text}>
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
              <Typography variant="body2" style={style.text}>
                {event?.description}
                <br />
                <br />
                🔗 <a href={event?.link}style={style.text}> Event URL :</a>
              </Typography>
              <Typography style={style.text}>
                © Organized by Club {event?.club_id?.name}
                <br />
              </Typography>
              <Typography style={style.text}>
                🏆 Prize : {prize}
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
       
          </Card>
  );
}
