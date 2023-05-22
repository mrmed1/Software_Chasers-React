import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Confirm, Icon, Popup } from "semantic-ui-react";

import { deleteEducation } from "../../Service/studentService";
import toast from "react-hot-toast";

export default function DeleteEducation({ _id, data, role }) {
  const [open, setOpen] = useState(false);

  const aUthorization = role === data.role ? false : true;

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ({ Education, _id }) => deleteEducation(Education, _id),
    {
      onSuccess: () => toast.success("Education  deleted successfully"),
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
    mutate({ Education: data, _id: _id });
    setOpen(false);
  };
  const handleCancel = () => setOpen(false);

  return (
    <div>
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
            ? "Delete your Education "
            : "You are Unauthorized to Delete "
        }
        position="top left"
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
