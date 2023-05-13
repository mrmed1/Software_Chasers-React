import DataTable from "../Table/DataTable";
import { useState, useEffect } from "react";
import * as api from "../../Service/EnseignantServices";
import toast, { Toaster } from "react-hot-toast";

export default function Enseignant() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.fetchEnseignants();
        setData(res);
        setLoading(false);
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
      id: "Responsible",
      width: "50",
      disablePadding: true,
      label: "Responsible",
      align: "center",
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
      name: "password",
      width: "17%",
      label: "Password",
      id: "password",
      multiline: false,
      detailsAttribute: false,
      displayed: false,
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
      name: "isResponsible",
      width: "15%",
      label: "Responsible",
      id: "Responsible",
      multiline: false,
      detailsAttribute: false,
      addAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "checkbox",
    },
    {
      name: "isPublic",
      width: "",
      label: "Public Account",
      id: "isPublic",
      multiline: false,
      detailsAttribute: false,
      addAttribute: true,
      editAttribute: true,
      displayed: false,
      object: false,
      type: "checkbox",
    },
  ];
  const addEnseignant = async (enseignant) => {
    const res = await api.addEnseignant(enseignant);

    setReload(!reload);
    return res;

  };

  const deleteEnseignant = async (enseignant) => {
    const res = await api.deleteEnseignant(enseignant._id);
    setReload(!reload);
    return res;
  };

  const updateEnseignant = async (id, enseignant) => {
    const res = await api.updateEnseignant(id, enseignant);
    setReload(!reload);
    return res;
  };

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          {" "}
          <Toaster />
          <DataTable
            setReload={setReload}
            headCells={headCells}
            addModel={addEnseignant}
            deleteModel={deleteEnseignant}
            updateModel={updateEnseignant}
            data={data}
            attributes={attributes}
            title="Enseignant"
            reloadData={reload}
          />
        </>
      )}
    </>
  );
}
