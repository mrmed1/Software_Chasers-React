import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";

const EditParticipants = ({ open, onClose, entity, onSave }) => {
  console.log("data from participants ", entity);
  const [participants, setParticipants] = React.useState(entity.participant);

  const handleChange = (event, id) => {
    const updatedParticipants = participants.map((participant) => {
      if (participant._id === id) {
        return {
          ...participant,
          status: event.target.value,
        };
      }
      return participant;
    });
    setParticipants(updatedParticipants);
  };

  const handleSave = () => {
    onSave(participants);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Participants List</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Inscription Date</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            {participants?.length > 0 ? (
              <TableBody>
                {participants.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {row.person.firstname} {row.person.lastname}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(row.Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <FormControl fullWidth>
                        <NativeSelect
                          id="demo-simple-select"
                          value={row.status}
                       
                          onChange={(event) => handleChange(event, row._id)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Rejected">Rejected</option>
                        </NativeSelect>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No participants yet.
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditParticipants;
