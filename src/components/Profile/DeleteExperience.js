import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Confirm, Icon, Popup } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";

import { deleteExperience } from "../../Service/studentService";

export default function DeleteExperience({ data, _id, role }) {
  const [open, setOpen] = useState(false);
  const aUthorization = role === data.role ? false : true;

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ({ Experience, _id }) => deleteExperience(Experience, _id),
    {
      onSuccess: () => toast.success("Experience  deleted successfully"),
      onError: () => toast.error("Oups somthing went wrong !"),

      onSettled: () => {
        queryClient.invalidateQueries("cv");
      },
    }
  );

  const show = () => {
    setOpen(true);
  };
  const handleConfirm = () => {
    mutate({ Experience: data, _id: _id });
    setOpen(false);
  };
  const handleCancel = () => setOpen(false);
  return (
    <div>
      <Toaster />
      <Popup
        inverted
        trigger={
          <Icon
            name="trash"
            color="red"
            size="big"
            onClick={show}
            style={{ float: "right", cursor: "pointer" }}
         disabled={aUthorization}
          />
        }
        content={
          !aUthorization
            ? "Delete your Experience "
            : "You are Unauthorized to Delete "
        }
        position="top left"
      />

      <Confirm
        open={open}
        header={` Deleting your  Experince in  ${data?.companyName}`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
