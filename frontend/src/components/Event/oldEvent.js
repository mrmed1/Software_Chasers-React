import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import * as api from "../../Service/EventServices";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EditEventDialog from "../Dialog/EditEventDialog";
import DeleteEventDialog from "../Dialog/DeleteEventDialog";
import AddEventDialog from "../Dialog/AddEventDialog";
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

const headCells = [
  {
    id: "name",
    width: "20",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "type",
    width: "100",
    disablePadding: true,
    label: "Type",
  },

  {
    id: "description",
    width: "50",
    disablePadding: true,
    label: "Description",
  },
  {
    id: "Action",
    width: "10",
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            size={headCell.width}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Event
      </Typography>
    </Toolbar>
  );
}

export default function Event() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDeleteEvent, setSelectedDeleteEvent] = useState(null);
  const [selectedEditEvent, setSelectedEditEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.fetchEvents();
        setEvents(res);
        setLoading(false);
        console.log(events);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
    fetchData();
  }, []);

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = (event) => {
    setSelectedDeleteEvent(event);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setSelectedDeleteEvent(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteEvent = (event) => {
    // Delete event logic here
    console.log("Deleting event", event);
  };

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
      {loading && <div>Loading</div>}
      {!loading && (
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

            <div>
              <AddEventDialog open={open} onClose={handleClose} />
            </div>

            {selectedEditEvent && (
              <EditEventDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                selectedEditEvent={selectedEditEvent}
                updateEvent={updateEvent}
              />
            )}

            <DeleteEventDialog
              open={openDeleteDialog}
              onClose={handleDeleteClose}
              selectedEvent={selectedDeleteEvent}
              deleteEvent={handleDeleteEvent}
            />

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
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            width="15%"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell width="15%" align="left">
                            {row.type}
                          </TableCell>
                          <TableCell width="65%" align="left">
                            {row.description}
                          </TableCell>
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
      )}
    </>
  );
}
