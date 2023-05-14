import React, {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {pickPFE, togglePFE, toogleValideResponsiblePFA} from "../../Service/internshipService";
import toast from "react-hot-toast";
import {tooglePickedPFA} from "../../Service/studentService";
import {Confirm, Icon} from "semantic-ui-react";


export default function PickPFE({ data, teacher, iconName }) {
    const [open, setOpen] = useState(false);
    console.log("DATA", data);
    const queryClient = useQueryClient();


    const pickMutation = useMutation(
        (id) => togglePFE(id),
        {
            onSuccess: (data) =>
                toast.success(data?.message || "PFE picked successfully !"),
            onError: (err) => toast.error(err.message),
            onSettled: () => queryClient.invalidateQueries("GetPFEforPick"),
        }
    );
    const show = () => {
        setOpen(true);
    };
    const handleConfirm = () => {

            pickMutation.mutate(data._id);


        setOpen(false);
    };



    const handleCancel = () => setOpen(false);
    return (
        <div>
            <div>
                <Icon
                    name={iconName}
                    color={data.isPicked ? "green" : "red"}
                    onClick={show}
                    style={{ float: "right", cursor: "pointer" }}
                    circular

                />
               <Confirm
                    open={open}
                    header={

                            data.isPicked
                                ? ` Want to Unpick This  Internship   ${data?.title}  ❔`
                                : ` You Want to pick This  Internship   ${data?.title}  ❔`

                    }
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
}
