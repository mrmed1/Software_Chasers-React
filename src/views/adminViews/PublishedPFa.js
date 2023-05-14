import React, { useEffect, useState } from "react";
import PFAList from "../../components/PFA/PFAList";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

import { Dimmer, Loader, Message } from "semantic-ui-react";
import { fetchPublishedPFA } from "../../Service/internshipService";
import * as AdminService from "../../Service/AdminService";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function PublishedPFa() {
  const { data, isLoading, error } = useQuery(
    "PublishedPFA",
    fetchPublishedPFA
  );

  const [dataFiltered, setDataFiltered] = useState([]);
  const [univYears, setUnivYears] = useState([]);
  const [selectedUnivYears, setSelectedUnivYears] = useState("0");

  useEffect(() => {
    return setDataFiltered(data);
  }, [data]);

  useEffect(() => {
    return async () => {
      try {
        setDataFiltered(data);
        let res = await AdminService.fetchUnivYear();
        res.map((univyear) => {
          univyear.start = univyear.start?.toString().slice(0, 4);
          univyear.end = univyear.end?.toString().slice(0, 4);
        });
        setUnivYears(res);
        /*  console.log(post);
                  console.log(data);*/
      } catch (e) {
        console.log("error", e);
      }
    };
  }, []);

  const handleChangeUnivYear = (e) => {
    setSelectedUnivYears(e.target?.value);

    if (e.target?.value === "0") {
      setDataFiltered(data);
      return;
    }

    let startTemp = e.target?.value.toString().slice(0, 4);
    let endTemp = e.target?.value?.toString().slice(5, 9);
    console.log(startTemp, endTemp)
    let filtered = data.filter(
      (event) =>
        event.univId?.start?.toString().slice(0, 4) === startTemp &&
        event.univId?.end?.toString().slice(0, 4) === endTemp
    );
    setDataFiltered(filtered);
    return;
  };

  if (isLoading)
    return (
      <Dimmer active inverted>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  if (error)
    return (
      <Message negative floating size="big" attached="top">
        <Message.Header>
          {error?.response?.data?.message || error?.message}
        </Message.Header>
      </Message>
    );
  return (
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
      <Toaster />
      {dataFiltered && <PFAList data={dataFiltered} />}
    </>
  );
}
