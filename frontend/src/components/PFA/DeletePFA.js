import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Confirm, Icon } from "semantic-ui-react";
import toast from "react-hot-toast";
export default function DeletePFA({ data,teacher_id }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const show = () => {
    setOpen(true);
  };
  const handleConfirm = () => {
   // mutate({Education:data,_id:_id})
    setOpen(false)
    

};
  const handleCancel = () => setOpen(false);
  return (
    <div>
          <div>
   
      <Icon
        name="trash"
        color="red"
        disabled={teacher_id!==data.createdBy}
        onClick={show}
        style={{ float: "right", cursor: "pointer" }}
        circular
      />
      <Confirm
       
        open={open}
        header={` Deleting your  Internship   ${data?.title}  ❔`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        
      />
    </div>
    </div>
  );
}
