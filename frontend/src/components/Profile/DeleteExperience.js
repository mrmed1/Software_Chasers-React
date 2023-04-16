import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Confirm, Icon } from "semantic-ui-react";
import toast,{Toaster} from 'react-hot-toast';

import { deleteExperience } from "../../Service/studentService";

export default function DeleteExperience({data,_id}) {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient()
  
    const {mutate} = useMutation(
      ({Experience,_id}) => deleteExperience(Experience,_id)
      ,
      {
        onSuccess: () => toast.success('Experience  deleted successfully'),
        onError: () => toast.error('Oups somthing went wrong !'),
  
        onSettled: () => {
          queryClient.invalidateQueries('cv')
          
     }
      }
    );
  
    const show = () => {
      setOpen(true);
    };
    const handleConfirm = () => {
      mutate({Experience:data,_id:_id})
      setOpen(false)
      
  
  };
    const handleCancel = () => setOpen(false);
  return (
    <div>
      <Toaster/>
    <Icon
      name="trash"
      color="red"
      size="big"
      onClick={show}
      style={{ float: "right", cursor: "pointer" }}
    />
    <Confirm
     
      open={open}
      header={` Deleting your  Experince in  ${data?.companyName}`}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      
    />
  </div>
  )
}
