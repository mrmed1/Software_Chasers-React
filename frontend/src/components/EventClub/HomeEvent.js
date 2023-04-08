import React, { Fragment, useEffect } from "react";
import * as api from "../../Service/EventService/EventService";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
 
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
 
import './HomeEvent.css';
import toast, {Toaster} from "react-hot-toast";
import {getAllEventClub} from "../../Service/EventService/EventService";
function HomeEvent() {
  let history = useNavigate();
  const [data, setData] = useState([]);
  

  

  useEffect(() => {
    async function getAllEventClub() {
      try {
        const res = await api.getAllEventClub();
        setData(res);
      /*  console.log(post);
        console.log(data);*/
      } catch (e) {
        console.log(e);
      }
    }
    getAllEventClub();
  }, []);

 


  
  const handleDelete = async (id) => {
        if (
          window.confirm("are you sure that you wanted to delete that EventClub record ")
        ) {
          const response = await api.deleteEventClub(id);
          if (response.status === 200) {
            toast.success(response.data);
            window.location.reload();
    
            setData();
            getAllEventClub();
          }
          else {
            toast.error("response.data");
          }
    
          //setTimeout(()=>history.push('/'),500);
          history("/HomeEvent");
        }
      };

  return (
    <Fragment>
      
    <Toaster />
      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>description</th>
              <th>Start date</th>
              <th>End date</th>
              <th>nbPlace</th>
              <th>urlEvent</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0
              ? data.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{new Date(item.startDate).toLocaleDateString()}</td>
                      <td>{new Date(item.endDate).toLocaleDateString()}</td>

                  

                      <td>{item.numberOfPlaces}</td>
                      <td>{item.link}</td>
                      <td>{item.location}</td>

                      <td>
                         
                          
                        
                       
                        &nbsp;
                        <Button onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : "no data available"}
          </tbody>
        </Table>
        <br></br>
        <Link to="/AddEvent" className="btn btn-danger btnadd ml-2">
          Add Event{" "}
        </Link>
      </div>
    </Fragment>
  );
}

export default HomeEvent;
