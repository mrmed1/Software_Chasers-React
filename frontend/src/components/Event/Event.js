import DataTable from "../Table/DataTable";
import {Fragment, useState, useEffect } from "react";
import * as api from "../../Service/EventServices";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as AdminService from "../../Service/AdminService";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
 
 

export default function Event() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [univ, setUniv] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [univYears, setUnivYears] = useState([]);
  const [selectedUnivYears, setSelectedUnivYears] = useState("0");
  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setDataFiltered(res);

        setLoading(true);
        const res = await api.fetchEvents();
        const univ = await api.getUniv();
        setUniv(univ);
        setEvents(res);
        setLoading(false);
        console.log(events);
      

        res = await AdminService.fetchUnivYear();
        res.map((univyear) => {
          univyear.start = univyear.start?.toString().slice(0, 4);
          univyear.end = univyear.end?.toString().slice(0, 4);
        });
        setUnivYears(res);
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

          <DataTable
            setReload={setReload}
            headCells={headCells}
            addModel={addEvent}
            deleteModel={deleteEvent}
            updateModel={updateEvent}
            dataf={dataFiltered}
            data={events}
            attributes={attributes}
            title="Event"
          />
        </>
      )}
    </>
  );
}
