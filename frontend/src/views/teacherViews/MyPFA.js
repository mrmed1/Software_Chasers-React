import React from "react";
import { fetchMyPFA } from "../../Service/EnseignantServices";
import PFAList from "../../components/PFA/PFAList";
import { useQuery } from "react-query";
import { Dimmer, Loader, Message } from "semantic-ui-react";
import { Toaster } from "react-hot-toast";

export default function MyPFA() {
  const { data, isLoading, error } = useQuery("MyPFA", fetchMyPFA);

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
         {error?.response?.data?.message || error.message}
        </Message.Header>
      
      </Message>
    );
  return (
    <>
      <Toaster />
      <PFAList data={data} />
    </>
  );
}
