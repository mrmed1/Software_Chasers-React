import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, Confirm, Popup } from "semantic-ui-react";
import { deleteSkills } from "../../Service/studentService";
import toast from "react-hot-toast";

export default function DeleteSkillsModal({ skill, _id }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const show = () => {
    setOpen(true);
  };
  const handleConfirm = () => {
    mutate({ Skills: skill, _id: _id });
    setOpen(false);
  };
  const handleCancel = () => setOpen(false);

  const { mutate } = useMutation(
    ({ Skills, _id }) => deleteSkills(Skills, _id),
    {
      onSuccess: (data) => toast.success(data),
      onError: (err) => toast.error(err.message),

      onSettled: () => {
        queryClient.invalidateQueries("cv");
      },
    }
  );

  return (
    <>
      <Popup
        content="You can delete this skill by clicking the button"
     
        header={`Deleting  ${skill}`}
        trigger={
          <Button color="blue" circular onClick={show} content={skill} />
        }
      />

      <Confirm
        open={open}
        header={` Deleting your this Skills   ${skill} ?`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
