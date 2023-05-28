import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Confirm, Icon } from "semantic-ui-react";
import toast from "react-hot-toast";
import { deletePFA ,publishPFA} from "../../Service/internshipService";
export default function DeletePFA({ data, teacher_id, isPublished, iconName }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(({ pfa }) => deletePFA(pfa), {
    onSuccess: () => toast.success("PFA IS DELETED X"),
    onError: (err) => toast.error(err.message),
    onSettled: () => queryClient.invalidateQueries("PFAList"),
  });
  const publishMutation = useMutation(({ pfa }) => publishPFA(pfa), {
    onSuccess: () => toast.success("PFA is published  successfully"),
    onError: (err) => toast.error(err.message),
    onSettled: () => queryClient.invalidateQueries("PFAList"),
  });
  const show = () => {
    setOpen(true);
  };
  const handleConfirm = () => {
    if (isPublished) {
      publishMutation.mutate({pfa:data})
    } else {
      mutate({ pfa: data });
    }

    setOpen(false);
  };

  const PublishTestIcon = isPublished && !data.isPublished ? "green" :"red"
  const handleCancel = () => setOpen(false);
  return (
    <div>
      <div>
        <Icon
          name={iconName}
          color={PublishTestIcon}
          disabled={teacher_id === data?.createdBy?._id ? false : true}
          onClick={show}
          style={{ float: "right", cursor: "pointer" }}
          circular
        />
        <Confirm
          open={open}
          header={
            isPublished
              ? ` Want to publish your  Internship   ${data?.title}  ❔`
              : ` Want to Delete your  Internship   ${data?.title}  ❔`
          }
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
