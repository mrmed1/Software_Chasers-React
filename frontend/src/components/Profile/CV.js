import React, { useEffect, useState } from "react";
import Experience from "./Experience";
import Education from "./Education";
import Internships from "./Internships";
import Skills from "./Skills";
import { useQuery } from "react-query";
import { fetchMyEvents, getcV } from "../../Service/studentService";
import {connectedUser} from "../../Service/auth.service";
import { getInternshipsByStudentId } from "../../Service/internshipService";
import "./cv.css"
import EventClubDetails from "../EventContainer/EventClubDetails";
export default function CV({Mode}) {
  const { data } = useQuery("cv", getcV);
  const {role,_id} = connectedUser()
  const {data:InternshipsList} = useQuery("getInternshipsByStudentId",getInternshipsByStudentId)
  const [myEvent, setMyEvent] = useState([])
  const id = connectedUser()._id


  useEffect(()=>{
    fetchMyEvents(id).then((r)=>{
      setMyEvent(r)
    
    })
    
   
  },[])
  
  return (
    <div>
    
      {data?.experience && <Experience role ={role}data={data.experience} _id={data._id} style={Mode} />}
      {data?.education && <Education role ={role} data={data.education} _id={data._id} style={Mode}/>}
    
      {InternshipsList && <Internships data={InternshipsList} style={Mode}/>}
      {data?.Skills && <Skills data={data.Skills} _id={data._id} style={Mode} />}

      
      {myEvent?.map((EV,index)=>{
        return(<div key={index}>
            <EventClubDetails style={Mode} event={EV}/> <br/>
        </div>
        )
      })}
      
     
    </div>
  );
}
