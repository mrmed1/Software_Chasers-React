import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Confirm, Icon } from "semantic-ui-react";

import { deleteEducation } from "../../Service/studentService";
import toast from 'react-hot-toast';

export default function DeleteEducation({ _id, data }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient()

  const {mutate} = useMutation(
    ({Education,_id}) => deleteEducation(Education,_id)
    ,
    {
      onSuccess: () => toast.success('Education  deleted successfully'),
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
    mutate({Education:data,_id:_id})
    setOpen(false)
    

};
  const handleCancel = () => setOpen(false);

  return (
    <div>
   
      <Icon
        name="trash"
        color="red"
        size="big"
        onClick={show}
        style={{ float: "right", cursor: "pointer" }}
      />
      <Confirm
       
        open={open}
        header={` Deleting your  Education in  ${data?.university}`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        
      />
    </div>
  );
}
