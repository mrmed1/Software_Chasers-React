import DataTable from "./DataTable";
import { useState, useEffect } from "react";
import * as api from "../../Service/EventClubService";
import toast, { Toaster } from "react-hot-toast";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export default function EventClub() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setTimeout(async () => {
          const res = await api.getEventClubById();
          setData(res);
          setLoading(false);
        }, 500);
       
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
    fetchData();
  }, [reload]);
  const headCells = [
    {
      id: "name",
      width: "20",
      disablePadding: true,
      label: "Title",
      align: "left",
    },
    {
      id: "domain",
      width: "20",
      disablePadding: true,
      label: "Domain",
      align: "left",
    },
    {
      id: "eventDate",
      width: "50",
      disablePadding: true,
      label: "Event Date",
      align: "left",
    },
    {
      id: "numberOfPlaces",
      width: "20",
      disablePadding: true,
      label: "Nb Places",
      align: "left",
    },
    {
      id: "startDate",
      width: "50",
      disablePadding: true,
      label: "Start Date",
      align: "left",
    },
    {
      id: "endDate",
      width: "50",
      disablePadding: true,
      label: "End Date",
      align: "left",
    },

    {
      id: "participant",
      width: "50",
      disablePadding: true,
      label: "Participants",
      align: "left",
    },
    {
      id: "Action",
      width: "10",
      disablePadding: false,
      label: "Action",
      align: "left",
    },
  ];

  const attributes = [
    {
      name: "name",
      width: "17%",
      label: "Title",
      id: "name",
      multiline: false,
      detailsAttribute: true,
      addAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "text",
      required: true,
    },
    {
      name: "description",
      width: "17%",
      label: "Description",
      id: "description",
      multiline: true,
      detailsAttribute: true,
      addAttribute: false,
      editAttribute: true,
      displayed: false,
      object: false,
      type: "text",
      required: true,
    },
    {
      name: "domain",
      width: "15%",
      label: "Domain",
      id: "domain",
      multiline: false,
      detailsAttribute: true,
      addAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "text",
      required: true,
    },
    {
      name: "eventDate",
      width: "12%",
      label: "Event Date",
      id: "eventDate",
      multiline: false,
      detailsAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "date",
    },
    {
      name: "numberOfPlaces",
      width: "11%",
      label: "Nb Places",
      id: "numberOfPlaces",
      multiline: false,
      detailsAttribute: true,
      addAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "text",
      required: true,
    },
    {
      name: "startDate",
      width: "12%",
      label: "Start Date",
      id: "startDate",
      multiline: false,
      detailsAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "date",
    },
    {
      name: "endDate",
      width: "12%",
      label: "End Date",
      id: "endDate",
      multiline: false,
      detailsAttribute: true,
      addAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "date",
      required: true,
    },
    {
      name: "participant",
      width: "20%",
      label: "Participant",
      id: "participant",
      multiline: false,
      detailsAttribute: false,
      addAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "button",
      required: true,
    },

  ];
 

  const deleteEventClub = async (eventClub) => {
    const res = await api.deleteEventClub(eventClub._id);
    setReload(!reload);
    return res;
  };

  const updateEventClub = async (id, eventClub) => {
   const res = await api.updateEventClub(id, eventClub);
    setReload(!reload);
    return res; 
  };

  return (
    <>
     <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          {" "}
          <Toaster />
          <DataTable
            setReload={setReload}
            headCells={headCells}
           
            deleteModel={deleteEventClub}
            updateModel={updateEventClub}
            data={data}
            attributes={attributes}
            title="My Event"
            reloadData={reload}
          />
        </>
      )}
    </>
  );
}
