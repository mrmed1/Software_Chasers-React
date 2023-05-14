import * as React from "react";
import EventCard from "../EventCard/EventCard";
import "./cardContainer.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as api from "../../Service/EventServices";

function EventContainer() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setTimeout(async () => {
          const res = await api.fetchEvents();
          setEvents(res);
          setLoading(false);
          console.log(res);
        }, 2000);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <h1>Event ISAMM List</h1>
        <br></br>
      </div>
      {loading && <div>Loading</div>}
      {!loading && (
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {events.map((event) => (
              <Grid item xs={4} key={event._id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default EventContainer;
