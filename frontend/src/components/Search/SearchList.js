import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

import CV from "./CV";
import Button from '@mui/material/Button';

export default function SearchList() {
    const location = useLocation();
    const results = location.state.results;
    const [data, setData] = useState(results);
    const [showCv,setShowCv]=useState(false);
    const [open, setOpen] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const [selectedId, setSelectedId] = useState("");
  
    useEffect(() => {
      async function fetchData() {
        try {
          setData(results);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }, [results]);
    const handleItemClick = item => {
      console.log(`Clicked item ${item._id}`);
    };
  const handleShowAccount =(data)=>{

    console.log('Show Account clicked')
setSelectedName(data.name);
setSelectedId(data._id);
    setShowCv(true);
    setOpen(true);
  }
  
  
  const handleClose = () => {
    setOpen(false);
  };
  let style;
  const darkMode = {
    card: { backgroundColor: "#23283e" },
    header: { color: "#cdcdff" },
    btn: { color: "#5bc0de " },
    text: { color: "#bdbddd" },
    text2: { color: "#f2f2f2" },
  };
  const lightMode = {
    card: { backgroundColor: "" },
    header: { color: "" },
    btn: { color: "" },
    text: { color: "black" },
    text2: { color: "" },
  };

  return (
    <div style={{width: '100%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    margin: '0 auto'}}>
    {setShowCv && <CV Mode={lightMode }  open={open} onClose={handleClose} name={selectedName} id={selectedId} />}
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
         {data?.map((item) => (
               <React.Fragment key={item._id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={item.name} src="/" />
        </ListItemAvatar>
        <ListItemText
          primary={item.name}
          secondary={
            <React.Fragment>
            {item.role === 'STUDENT' ?(<>
  <Typography
  sx={{ display: 'inline' }}
  component="span"
  variant="body2" 
  color="text.primary"
>
  classe
</Typography>
 {` : ${item.level}  ${item.class}`}</>
              ):(<>{item.role} </>)}
            
               
              
            </React.Fragment>
          }
        /><Button  variant="outlined"     onClick={() => handleShowAccount(item)} >Show account</Button>
   
      </ListItem>
    <Divider   component="li" />
    </React.Fragment>
      ))}
      
    </List>
    </div>
  );
}