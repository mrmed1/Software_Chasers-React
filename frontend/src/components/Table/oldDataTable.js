import * as React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditEventDialog from "../Dialog/EditEventDialog";
import DeleteEventDialog from "../Dialog/DeleteEventDialog";
import AddEventDialog from "../Dialog/AddEventDialog";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable({
  headCells,
  data,
  attributes,
  handleDelete,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [events, setEvents] = useState(data);

  const [selectedEditEvent, setSelectedEditEvent] = useState(null);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const editEvent = (event) => {
    setSelectedEditEvent(event);
    setEditDialogOpen(true);
  };
  const updateEvent = (updatedEvent) => {};

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EnhancedTableToolbar />
            <Button
              variant="outlined"
              onClick={handleOpen}
              startIcon={<AddIcon />}
            >
              Add Event
            </Button>
          </div>

          <AddEventDialog open={open} onClose={handleClose} />

          {selectedEditEvent && (
            <EditEventDialog
              open={editDialogOpen}
              onClose={() => setEditDialogOpen(false)}
              selectedEditEvent={selectedEditEvent}
              updateEvent={updateEvent}
            />
          )}

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={events.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(events, getComparator(order, orderBy))
                  .slice(
                    page === 0
                      ? page * rowsPerPage
                      : page * page * rowsPerPage + 1,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                        sx={{ cursor: "pointer" }}
                      >
                        {attributes.map((attribute) => (
                          <TableCell align="left" width={`${attribute.width}`}>
                            {row[attribute.name]}
                          </TableCell>
                        ))}
                        <TableCell>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(row)}
                          >
                            <DeleteIcon />
                          </IconButton>

                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => editEvent(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={events.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
