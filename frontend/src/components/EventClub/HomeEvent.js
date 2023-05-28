// import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment, useEffect, useState } from "react";
import * as api from "../../Service/EventService/EventService";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EventClubDetailsC from '../EventContainer/EventClubDetailsC'

function HomeEvent() {
  let history = useNavigate();
  const [data, setData] = useState([]);

  



  useEffect(() => {
    async function getAllEventClub() {
      try {
        const res = await api.getAllEventClub();
        console.log("res",res)
        setData(res);
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

  return (
    <Fragment>
      <Toaster />
      <h2 style={{ textAlign: "center" }}>List of Event Club</h2>
      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>

              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>urlEvent</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0
              ? data.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {new Date(item.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.endDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>{item.link}</TableCell>

                      <TableCell>
                        &nbsp;
                        <IconButton onClick={() => handleDelete(item._id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
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
