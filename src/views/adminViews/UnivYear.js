import DataTable from "../../components/Table/DataTable";
import { useState, useEffect } from "react";
import * as api from "../../Service/AdminService";
import toast, { Toaster } from "react-hot-toast";

export default function Enseignant() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.fetchUnivYear();
        res.map((univyear) => {
          univyear.start = univyear.start?.toString().slice(0, 10);
          univyear.end = univyear.end?.toString().slice(0, 10);
        });
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
      id: "Name",
      width: "20",
      disablePadding: true,
      label: "Name",
      align: "left",
    },
    {
      id: "Start",
      width: "20",
      disablePadding: true,
      label: "Start",
      align: "left",
    },
    {
      id: "End",
      width: "20",
      disablePadding: true,
      label: "End",
      align: "left",
    },
    {
      id: "Is_Current",
      width: "100",
      disablePadding: true,
      label: "Is Current",
      align: "left",
    },
  ];

  const attributes = [
    {
      name: "name",
      width: "17%",
      label: "Name",
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
      name: "start",
      width: "17%",
      label: "start",
      id: "start",
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
      name: "end",
      width: "17%",
      label: "end",
      id: "end",
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
      name: "isCurrent",
      width: "17%",
      label: "Is Current",
      id: "isCurrent",
      multiline: false,
      detailsAttribute: true,
      addAttribute: true,
      editAttribute: true,
      displayed: true,
      object: false,
      type: "checkbox",
    },
  ];
  const addUnivYear = async (univYear) => {
    const res = await api.addUnivYear(univYear);

    setReload(!reload);
    return res;
  };

  const deleteUnivYear = async (univYear) => {
    const res = await api.deleteUnivYear(univYear._id);
    setReload(!reload);
    return res;
  };

  const updateUnivYear = async (id, univYear) => {
    const res = await api.updateUnivYear(univYear);
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
            addModel={addUnivYear}
            deleteModel={deleteUnivYear}
            updateModel={updateUnivYear}
            data={data}
            attributes={attributes}
            title="Année Universitaire"
            reloadData={reload}
          />
        </>
      )}
    </>
  );
}
