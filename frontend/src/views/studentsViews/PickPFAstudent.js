import React from 'react'
import PFAList from '../../components/PFA/PFAList'
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

import { Dimmer, Loader, Message } from 'semantic-ui-react';
import { fetchValidatedResponsablePFA } from '../../Service/studentService';




export default function PickPFAstudent() {

    const { data, isLoading,error } = useQuery("ValidatedResponsablePFA", fetchValidatedResponsablePFA);
    
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
    )
  return (
    <>
    
    <Toaster />
    {data && <PFAList data={data}/> }
    </>
   
  )
}
