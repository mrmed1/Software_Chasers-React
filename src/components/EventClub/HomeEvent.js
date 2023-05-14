// import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment, useEffect, useState } from "react";
import * as api from "../../Service/EventService/EventService";
import * as AdminService from "../../Service/AdminService";
import { getAllEventClub } from "../../Service/EventService/EventService";

import { Button } from "primereact/button";

// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./HomeEvent.css";
import toast, { Toaster } from "react-hot-toast";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function HomeEvent() {
  let history = useNavigate();
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [univYears, setUnivYears] = useState([]);
  const [selectedUnivYears, setSelectedUnivYears] = useState("0");

  useEffect(() => {
    async function getAllEventClub() {
      try {
        let res = await api.getAllEventClub();
        setData(res);
        setDataFiltered(res);

        res = await AdminService.fetchUnivYear();
        res.map((univyear) => {
          univyear.start = univyear.start?.toString().slice(0, 4);
          univyear.end = univyear.end?.toString().slice(0, 4);
        });
        setUnivYears(res);
        /*  console.log(post);
                  console.log(data);*/
      } catch (e) {
        console.log(e);
      }
    }

    getAllEventClub();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "are you sure that you wanted to delete that EventClub record "
      )
    ) {
      const response = await api.deleteEventClub(id);
      if (response.status === 200) {
        toast.success("deleted successfully");
        history("/HomeEvent");

        setData();
        getAllEventClub();
      } else {
        toast.success("deleted successfully");
        history("/HomeEvent");
      }

      //setTimeout(()=>history.push('/'),500);
      history("/HomeEvent");
    }
  };

  const handleChangeUnivYear = (e) => {
    setSelectedUnivYears(e.target?.value);

    if (e.target?.value === "0") {
      setDataFiltered(data);
      return;
    }

    let startTemp = e.target?.value.toString().slice(0, 4);
    let endTemp = e.target?.value?.toString().slice(5, 9);
    let filtered = data.filter(
      (event) =>
        event.startDate?.toString().slice(0, 4) === startTemp &&
        event.endDate?.toString().slice(0, 4) === endTemp
    );
    setDataFiltered(filtered);
    return;
  };

  return (
    <Fragment>
      <Toaster />
      <h2 style={{ textAlign: "center" }}>List of Event Club</h2>
      <div style={{ margin: "10rem" }}>
        <FormControl fullWidth style={{ width: "250px" }}>
          <InputLabel id="demo-simple-select-label">
            Annee Universitaire
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedUnivYears}
            label="Age"
            onChange={(e) => {
              handleChangeUnivYear(e);
            }}
          >
            <MenuItem value={"0"}>Tous</MenuItem>
            {univYears.map((univYear) => {
              return (
                <MenuItem value={univYear.start + "/" + univYear.end}>
                  {univYear.start}/{univYear.end}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Table striped bordered hover size="sm">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>nbPlace</TableCell>
              <TableCell>urlEvent</TableCell>
              <TableCell>location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && dataFiltered.length > 0
              ? dataFiltered.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        {new Date(item.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.endDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>{item.numberOfPlaces}</TableCell>
                      <TableCell>{item.link}</TableCell>
                      <TableCell>{item.location}</TableCell>

                      <TableCell>
                        &nbsp;
                        <Button onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : "no data available"}
          </TableBody>
        </Table>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#088dd5",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              history("/AddEvent");
            }}
          >
            Add Event
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

export default HomeEvent;
