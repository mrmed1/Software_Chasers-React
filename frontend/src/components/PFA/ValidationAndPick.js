import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Confirm, Icon } from "semantic-ui-react";
import toast from "react-hot-toast";
import { toogleValideResponsiblePFA } from "../../Service/internshipService";
import { tooglePickedPFA } from "../../Service/studentService";
export default function ValidationAndPick({ data, _id, student, iconName }) {
  const [open, setOpen] = useState(false);
  console.log("DATA", data);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(({ pfa }) => toogleValideResponsiblePFA(pfa), {
    onSuccess: (data) =>
      toast.success(data?.message || "Updated successfully !"),
    onError: (err) => toast.error(err.message),
    onSettled: () => queryClient.invalidateQueries("PublishedPFA"),
  });
  const pickMutation = useMutation(
    ({ pfa, studentsId }) => tooglePickedPFA(pfa, studentsId),
    {
      onSuccess: (data) =>
        toast.success(data?.message || "Updated successfully !"),
      onError: (err) => toast.error(err.message),
      onSettled: () => queryClient.invalidateQueries("ValidatedResponsablePFA"),
    }
  );
  const show = () => {
    setOpen(true);
  };
  const handleConfirm = () => {
    if (student) {
      pickMutation.mutate({ pfa: data, studentsId: _id });
    } else {
      mutate({ pfa: data });
    }

    setOpen(false);
  };
  //UI staff
  const isIdPresent = (id) => {
    return data.studentsId.some((student) => student._id === id);
  };

  const aUthorized =
    (student && isIdPresent(_id) && data.isPicked) || !data.isPicked || !student
      ? false
      : true;
  console.log("aUthorized", aUthorized);
  const iconColor =
    (student && data.isPicked) || (!student && data.isValidResponsable)
      ? "green"
      : "red";
  const handleCancel = () => setOpen(false);
  return (
    <div>
      <div>
        <Icon
          name={iconName}
          color={iconColor}
          onClick={show}
          style={{ float: "right", cursor: "pointer" }}
          circular
          disabled={aUthorized}
        />
        <Confirm
          open={open}
          header={
            student
              ? data.isPicked
                ? ` Want to Unpick This  Internship   ${data?.title}  ❔`
                : ` You Want to pick This  Internship   ${data?.title}  ❔`
              : data.isValidResponsable
              ? ` Want to Unvalidate This  Internship   ${data?.title}  ❔`
              : ` You Want to validate This  Internship   ${data?.title}  ❔`
          }
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
