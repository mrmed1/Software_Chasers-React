import React from 'react'
import PFAList from '../../components/PFA/PFAList'
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

import { Dimmer, Loader } from 'semantic-ui-react';
import { fetchPfaList } from '../../Service/internshipService';

export default function CrudPFA() {
    const { data, isLoading } = useQuery("PFAList", fetchPfaList);
    console.log(data);
    if (isLoading)
    return (
      <Dimmer active inverted>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  return (
    <>
    
    <Toaster />
    <PFAList data={data}/>
    </>
   
  )
}
