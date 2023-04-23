import React from "react";
import Experience from "./Experience";
import Education from "./Education";
import Internships from "./Internships";
import Skills from "./Skills";
import { useQuery } from "react-query";
import { getcV } from "../../Service/studentService";
import {connectedUser} from "../../Service/auth.service";
import { getInternshipsByStudentId } from "../../Service/internshipService";
import "./cv.css"
export default function CV({Mode}) {
  const { data } = useQuery("cv", getcV);
  const {role,_id} = connectedUser()
  const {data:InternshipsList} = useQuery("getInternshipsByStudentId",getInternshipsByStudentId)

  
  return (
    <div>
    
      {data?.experience && <Experience role ={role}data={data.experience} _id={data._id} style={Mode} />}
      {data?.education && <Education role ={role} data={data.education} _id={data._id} style={Mode}/>}
    
      {InternshipsList && <Internships data={InternshipsList} style={Mode}/>}
      {data?.Skills && <Skills data={data.Skills} _id={data._id} style={Mode} />}
     
    </div> 
  );
}
