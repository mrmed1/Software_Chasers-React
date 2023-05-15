import * as React from "react";
import EventCard from "../EventCard/EventCard";
import "./cardContainer.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as api from "../../Service/EventClubService";
import {
  Backdrop,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,Button
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function EventClubContainer() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedClubs, setSelectedClubs] = useState([]);
  const [domainList, setDomainList] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: null,
    end: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getAllEventClub();
        setEvents(res);
        setLoading(false);
        console.log(res);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const uniqueDomains = [...new Set(events?.map((event) => event.domain))];
    setDomainList(uniqueDomains);
  }, [events]);

  useEffect(() => {
    const uniqueClubs = [...new Set(events?.map((event) => event.club_id?.name))];
    setClubList(uniqueClubs);
  }, [events]);

  const handleDomainChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDomains((prevSelectedDomains) => [
        ...prevSelectedDomains,
        value,
      ]);
    } else {
      setSelectedDomains((prevSelectedDomains) =>
        prevSelectedDomains?.filter((domain) => domain !== value)
      );
    }
  };

  const handleClubChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedClubs((prevSelectedClubs) => [...prevSelectedClubs, value]);
    } else {
      setSelectedClubs((prevSelectedClubs) =>
        prevSelectedClubs.filter((club) => club !== value)
      );
    }
  };
  const handleDateChange = (event, field) => {
    const { value } = event.target;
    setSelectedDateRange((prevDateRange) => ({
      ...prevDateRange,
      [field]: value,
    }));
  };

  const isEventDateInRange = (event) => {
    if (!selectedDateRange.start || !selectedDateRange.end) {
      return true; // No date range selected, show all events
    }

    const eventDate = new Date(event.eventDate);
    const startDate = new Date(selectedDateRange.start);
    const endDate = new Date(selectedDateRange.end);

    return eventDate >= startDate && eventDate <= endDate;
  };
  const filteredEvents = events?.filter((event) => {
    const isDomainSelected =
      selectedDomains.length === 0 || selectedDomains.includes(event.domain);
    const isClubSelected =
      selectedClubs.length === 0 || selectedClubs.includes(event.club_id.name);
    const isDateInRange = isEventDateInRange(event);
    return isDomainSelected && isClubSelected && isDateInRange;
  });
  const clearDateRange = () => {
  setSelectedDateRange({ start: "", end: "" });
};
  
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <h1>Event Club List</h1>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Filter</Typography>
          </AccordionSummary>
          <AccordionDetails >
    
          <FormControl sx={{ marginBottom: 1 }}>
  <Typography variant="subtitle1" gutterBottom>
    Domain
  </Typography>
  <div style={{ display: 'flex' }}>
    {domainList?.map((domain) => (
      <FormControlLabel
        key={domain}
        control={
          <Checkbox
            checked={selectedDomains.includes(domain)}
            onChange={handleDomainChange}
            value={domain}
          />
        }
        label={domain}
      />
    ))}
  </div>
</FormControl>

<FormControl sx={{ marginBottom: 1 }}>
  <Typography variant="subtitle1" gutterBottom>
    Club
  </Typography>
  <div style={{ display: 'flex' }}>
    {clubList?.map((club) => (
      <FormControlLabel
        key={club}
        control={
          <Checkbox
            checked={selectedClubs?.includes(club)}
            onChange={handleClubChange}
            value={club}
          />
        }
        label={club}
      />
    ))}
  </div>
</FormControl>
<FormControl sx={{ marginBottom: 1 }}>
  <Typography variant="subtitle1" gutterBottom>
    Date Range
  </Typography>
  <div style={{ display: 'flex' }}>
    <TextField
      label="Start Date"
      type="date"
      value={selectedDateRange.start || ""}
      onChange={(e) => handleDateChange(e, "start")}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ marginRight: 2 }}
    />
    <TextField
      label="End Date"
      type="date"
      value={selectedDateRange.end || ""}
      onChange={(e) => handleDateChange(e, "end")}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ marginRight: 2 }}
    />
    <Button variant="outlined" sx={{width:"20%"}} onClick={clearDateRange}>
      Clear
    </Button>
  </div>
</FormControl>

        
          </AccordionDetails>
        </Accordion>
      </div>
      {!loading && (
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {filteredEvents?.map((event) => (
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

export default EventClubContainer;
