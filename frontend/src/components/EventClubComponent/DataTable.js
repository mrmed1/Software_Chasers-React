import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import DeleteDialog from "./DeleteDialog";
 
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import Container from "./Container";
import EditDialog from "./EditDialog";
import DetailsDialog from "./DetailsDialog";
import toast, { Toaster } from "react-hot-toast";
import ParticipantsDialog from "./ParticipantsDialog";

function DataTable({
  headCells,
  data,
  attributes,
  title,
  deleteModel,
  updateModel,
  addModel,
  reloadData,
  setReload,
}) {
  const [isEditingOrDeleting, setIsEditingOrDeleting] = useState(false);

  const [open, setOpen] = useState(false);

  const [selectedEditEntity, setSelectedEditEntity] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
 
  

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDeleteEntity, setSelectedDeleteEntity] = useState(null);
  const [selectedParticipantData, setSelectedParticipantData] = useState(null);

  const [selectedData, setSelectedData] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const [openParticipantsDialog, setOpenParticipantsDialog] = useState(false);
  //Edit
  const handleEdit = (entity) => {
    setIsEditingOrDeleting(true);
    setSelectedEditEntity(entity);
    setEditDialogOpen(true);
  };
  const updateEntity = (id, updateEntity) => {
    updateModel(id, updateEntity)
    .then((response) => {
      toast.success(`${title}`+' updated Successfully');
      
  })
  .catch((error) => {
      toast.error('Edit Failed');

  });
  };

  //Add
  const addEntity = async (entity) => {
 
    await  addModel(entity)
    .then((response) => {
        toast.success(`${title}`+' added Successfully');
        
    })
    .catch((error) => {
        toast.error('Added Failed');
 
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Delete
  const handleDelete = (event) => {
    setIsEditingOrDeleting(true);
    setSelectedDeleteEntity(event);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setSelectedDeleteEntity(null);
    setOpenDeleteDialog(false);
    setIsEditingOrDeleting(false);
  };

  const handleDeleteEntity = (event) => {
    deleteModel(event).then((response) => {
      toast.success(`${title}`+' deleted Successfully');
      
  })
  .catch((error) => {
      toast.error('Delete Failed');

  });
  };

  //Details

  const handleRowClick = (data) => {
    if (!isEditingOrDeleting) {
      console.log("editDialog = " + editDialogOpen);
      setSelectedData(data);
      setOpenDetailsDialog(true);
    }
  };
  //ParticipantsDialog
  const handleShowParticipantsDialog = (data) => {
    if (!isEditingOrDeleting&&!openDetailsDialog) {
     
      setSelectedParticipantData(data);
      setOpenParticipantsDialog(true);
      setOpenDetailsDialog(false);
    }
    setOpenDetailsDialog(false);
  };
  
  useEffect(() => {
    setOpenDetailsDialog(false);
  }, [isEditingOrDeleting]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar title={title} handleOpen={handleOpen} />
          <Toaster />
         

          <DeleteDialog
            open={openDeleteDialog}
            onClose={handleDeleteClose}
            selectedEntity={selectedDeleteEntity}
            deleteEntity={handleDeleteEntity}
            title={title}
          />

          {selectedEditEntity && (
            <EditDialog
              open={editDialogOpen}
              onClose={() => {
                setIsEditingOrDeleting(false);
                setEditDialogOpen(false);
              }}
              entity={selectedEditEntity}
              attributes={attributes}
              onSave={updateEntity}
              title={title}
            />
          )}
           {(!openParticipantsDialog && openDetailsDialog)&& (<DetailsDialog
            open={openDetailsDialog}
            onClose={() => {
              setOpenDetailsDialog(false);
              setIsEditingOrDeleting(false);
            }}
            selectedData={selectedData}
            attributes={attributes}
          />
          )}
          {openParticipantsDialog && (   <ParticipantsDialog
          data={selectedParticipantData}
            open={openParticipantsDialog}
            onClose={() => {
              setOpenParticipantsDialog(false);
              setOpenDetailsDialog(false);
              setIsEditingOrDeleting(false);
            }}
          />
          )}

          <Container
            headCells={headCells}
            data={data}
            attributes={attributes}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleRowClick={handleRowClick}
            handleShowParticipantsDialog={handleShowParticipantsDialog}
          />
        </Paper>
      </Box>
    </>
  );
}
export default DataTable;
