import DataTable from "./DataTable";
import { useState, useEffect } from "react";
import * as api from "../../Service/AdminServices";
import toast, { Toaster } from "react-hot-toast";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setTimeout(async () => {
          const res = await api.fetchAdmins();
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
      id: "firstname",
      width: "20",
      disablePadding: true,
      label: "First Name",
      align: "left",
    },
    {
      id: "lastname",
      width: "100",
      disablePadding: true,
      label: "Last name",
      align: "left",
    },
    {
      id: "login",
      width: "50",
      disablePadding: true,
      label: "Login",
      align: "left",
    },
    {
      id: "email",
      width: "50",
      disablePadding: true,
      label: "Email",
      align: "left",
    },

    {
      id: "phone",
      width: "50",
      disablePadding: true,
      label: "Phone",
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
      name: "firstname",
      width: "17%",
      label: "First Name",
      id: "firstname",
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
      name: "lastname",
      width: "17%",
      label: "Last name",
      id: "lastname",
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
      name: "login",
      width: "17%",
      label: "Login",
      id: "login",
      multiline: false,
      detailsAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "text",
    },
    {
      name: "email",
      width: "20%",
      label: "Email",
      id: "email",
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
      name: "phone",
      width: "17%",
      label: "Phone",
      id: "phone",
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
      name: "dob",
      width: "20%",
      label: "Date of birth",
      id: "date",
      multiline: false,
      detailsAttribute: true,
      addAttribute: true,
      editAttribute: true,
      displayed: false,
      object: false,
      type: "date",
      required: true,
    },
    {
      name: "access",
      width: "",
      label: "Access",
      id: "access",
      multiline: false,
      detailsAttribute: true,
      addAttribute: true,
      editAttribute: true,
      displayed: false,
      object: false,
      type: "multiSelect",
      data: [
        { id: "MANAGESTUDENTS", label: "Manage Students" },
        { id: "MANAGETEACHERS", label: "Manage Teachers" },
        { id: "MANAGECLUBS", label: "Manage Clubs" },
        { id: "MANAGEEVENTS", label: "Manage Events" },
        { id: "MANAGEINTERNSHIPS", label: "Manage Internships" },
      ],
    },
  ];
  const addAdmin = async (admin) => {
    const res = await api.addAdmin(admin);

    setReload(!reload);
    return res;
  };

  const deleteAdmin = async (admin) => {
    const res = await api.deleteAdmin(admin._id);
    setReload(!reload);
    return res;
  };

  const updateAdmin = async (id, admin) => {
    const res = await api.updateAdmin(id, admin);
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
            addModel={addAdmin}
            deleteModel={deleteAdmin}
            updateModel={updateAdmin}
            data={data}
            attributes={attributes}
            title="Admin"
            reloadData={reload}
          />
        </>
      )}
    </>
  );
}
