import * as React from "react";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon  from '@mui/icons-material/Done';
import { useState } from "react";
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

 function Container({
  headCells,
  data,
  attributes,
  handleDelete,
  handleEdit,handleRowClick,
  reloadData, setReload
}) {
  const [allData,setAllData]=React.useState(data);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allData.length) : 0;


  return (
    <>

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
                rowCount={allData.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(allData, getComparator(order, orderBy))
                  .slice(
                   page * rowsPerPage
                     ,
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
                        attribute.displayed && <TableCell align={attribute.type === "checkbox" ? "center" : "left"} width={`${attribute.width}`}>
                            {attribute.type==='checkbox'?row[attribute.name]? <DoneIcon/>:<CloseIcon/>:row[attribute.name]}
                          </TableCell>
                        ))}
                        <TableCell>
                        <IconButton
                            edge="end"
                            aria-label="show detauks"
                            onClick={() => handleRowClick(row)}
                          >
                            <VisibilityIcon />
                          </IconButton>  

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
                            onClick={() => handleEdit(row)}
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
            count={allData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
       
    </>
  );
}

export default Container;
