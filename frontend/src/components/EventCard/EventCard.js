import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./EventCard.css";
import { useState } from "react";
import EventDetails from "../EventContainer/EventDetails";

function EventCard({ event }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCardClick = () => {
    console.log(`Clicked card: ${event.name}`);
    handleOpen();
  };

  const handleButtonClick = () => {
    // Handle button click event
    console.log(`Clicked button: ${event.name}`);
    handleOpen();
  };

  return (
    <>
      <EventDetails
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        event={event}
      />
      <Card data-test={`event-${event._id}`} sx={{ maxWidth: 400 }}>
        <CardActionArea
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={handleCardClick}
          data-test="dialog-body"
        >
          <CardContent>
            <Typography
              id={`event-name-${event._id}`}
              gutterBottom
              variant="h5"
              component="div"
            >
              {event.name}
            </Typography>

            <div style={{ display: "flex" }}>
              <Typography
                id={`event-date-${event._id}`}
                sx={{ marginBottom: 1.5, marginRight: 2 }}
                color="text.secondary"
              >
                {new Date(event.eventDate).toLocaleDateString()}
              </Typography>
              <Typography
                id={`event-clubDomain-${event._id}`}
                sx={{ marginBottom: 1.5 }}
                color="text.secondary"
              >
                Domain: {event?.domain}
              </Typography>
            </div>

            <Typography
              variant="body2"
              className="event-description"
              id={`event-description-${event._id}`}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
                overflow: "hidden",
              }}
            >
              {event.description}
            </Typography>
            <Typography
              id={`event-clubName-${event._id}`}
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              By: {event?.club_id?.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            data-test="showMore-button"
            size="small"
            color="primary"
            onClick={handleButtonClick}
          >
            show more
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default EventCard;
