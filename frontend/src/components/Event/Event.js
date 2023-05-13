import DataTable from "../Table/DataTable";
import { useState, useEffect } from "react";
import * as api from "../../Service/EventServices";

export default function Event() {
  const [events, setEvents] = useState([]);
  const [univ, setUniv] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.fetchEvents();
        const univ = await api.getUniv();
        setUniv(univ);
        setEvents(res);
        setLoading(false);
        console.log(events);
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
      label: "Name",
    },
    {
      id: "type",
      width: "100",
      disablePadding: true,
      label: "Type",
    },
    {
      id: "date",
      width: "100",
      disablePadding: true,
      label: "Date",
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

  const attributes = [
    {
      name: "name",
      width: "15%",
      label: "Name",
      id: "name",
      multiline: false,
      detailsAttribute: true,
      addAttribute:true,
      editAttribute: true,
      displayed:true,
      object: false,
      required: true
    },
    {
      name: "type",
      width: "15%",
      label: "Type",
      id: "type",
      multiline: false,
      displayed:true,
      addAttribute:true,
      editAttribute: true,
      detailsAttribute: true,
      object: false,
      required: true
    },
    {
      name: "eventDate",
      width: "15%",
      label: "Date",
      id: "date",
      multiline: false,
      displayed:true,
      addAttribute:true,
      editAttribute: true,
      detailsAttribute: true,
      object: false,
      required: true,
      type: "date"
    },
    {
      name: "description",
      width: "65%",
      label: "Description",
      id: "description",
      multiline: true,
      minRows: 3,
      maxRows: 6,
      detailsAttribute: true,
      addAttribute:true,
      editAttribute: true,
      displayed:true,
      object: false,
      required: true
    },
    {
      name: "univId.name",
      label: "Univ",
      id: "Univ",
      multiline: false,
      editAttribute: false,
      detailsAttribute: true,
      addAttribute:false,
      object: true,
    },
  ];
  const addEvent = async (event) => {
  
    event.univId = univ._id;
    console.log(event);
    const res = await api.addEvent(event);
   
   setReload(!reload);
   return res;
   
  };

  const deleteEvent = async (event) => {
    const res = await api.deleteEvent(event._id);
    setReload(!reload);
    return res;
   
  };

  const updateEvent = async (id, event) => {
    const res = await api.updateEvent(id, event);
   
    setReload(!reload);
    return res;

  };

  return (
    <>
      
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          <DataTable
            setReload={setReload}
            headCells={headCells}
            addModel={addEvent}
            deleteModel={deleteEvent}
            updateModel={updateEvent}
            data={events}
            attributes={attributes}
            title="Event"
          />
        </>
      )}
    </>
  );
}
