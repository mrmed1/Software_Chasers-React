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



const ParticipantsDialog = ({ open, onClose ,data}) => {
    console.log('data from participants ',data)


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
    {data.length > 0 ? (
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left">  
              {row.person.firstname} {row.person.lastname}
            </TableCell>
            <TableCell align="left">{new Date(row.Date).toLocaleDateString()}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
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
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default ParticipantsDialog;
