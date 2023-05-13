import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./EventCard.css";
import { useState } from 'react';
import EventDetails from"../EventContainer/EventDetails";

function EventCard({ event }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  }
  const handleCardClick = () => {
  
    console.log(`Clicked card: ${event.name}`);
    handleOpen();

  };

  const handleButtonClick = () => {
    // Handle button click event
    console.log(`Clicked button: ${event.name}`);
    handleOpen();
  };

  return (<>
    <EventDetails
    open={open}
    onClose={()=>{setOpen(false)}}
    event={event}
    />
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {new Date(event.eventDate).toLocaleDateString()}
      </Typography>
          <Typography
            variant="body2"
            className="event-description"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
              overflow: "hidden",
            }}
          >
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleButtonClick}>
          show more
        </Button>
      </CardActions>
    </Card>
    </>
  );
}

export default EventCard;
