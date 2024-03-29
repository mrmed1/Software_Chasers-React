import React, { useState } from "react";
import { Icon, Form, Modal, Radio, Dropdown, Popup } from "semantic-ui-react";
import { competenceList, jobTypesList } from "../../Helpers/helper";
import { useQueryClient, useMutation } from "react-query";
import { addExperience, updateExperience } from "../../Service/studentService";
import { toast } from "react-hot-toast";

export default function ExperienceModal({ data, add, _id, iconName, role }) {
  const [jobTitle, setJobTitle] = useState(data?.jobTitle);
  const [jobType, setJobType] = useState(data?.jobType);
  const [companyName, setCompanyName] = useState(data?.companyName);
  const [startDate, setStartDate] = useState(data?.startDate);
  const [endDate, setEndDate] = useState(data?.endDate);
  const [description, setDesciption] = useState(data?.description);
  const [competences, setCompetences] = useState(data?.competences);
  const [place, setPlace] = useState(data?.place);
  const queryClient = useQueryClient();

  const aUthorization = add ? false :( data.role === role ? false : true)

  const handleDropdownChange = (event, data) => {
    setCompetences(data.value);
  };
  const handleJobTypeChange = (event, { value }) => {
    setJobType(value);
  };

  const createExperienceMutation = useMutation(
    ({ Experience, _id }) => addExperience(Experience, _id),
    {
      onSuccess: () => toast.success("Experience  Created successfully !"),
      onError: () => toast.error("Oups somthing went wrong !"),
      onSettled: () => {
        queryClient.invalidateQueries("cv");
      },
    }
  );

  const UpdateExperienceMutation = useMutation(
    ({ Experience, _id }) => updateExperience(Experience, _id),
    {
      onSuccess: () => toast.success("Experience  Updated successfully !"),
      onError: () => toast.error("Oups somthing went wrong !"),

      onSettled: () => {
        queryClient.invalidateQueries("cv");
      },
    }
  );

  function hundlSubmit(e) {
    e.preventDefault();

    const Experience = {
      jobTitle: jobTitle,
      jobType: jobType,
      companyName: companyName,
      startDate: startDate,
      endDate: endDate,
      description: description,
      competences: competences,
      place: place,
      role:role
    };
    if (competences.length < 1) {
      return toast.error("Competences are required ! ");
    }
    if (!jobType) {
      return toast.error("Jobe Type is  required ! ");
    }

    if (add) {
    
      console.log("Experience",Experience)

      createExperienceMutation.mutate({ Experience, _id });
    } else {
      Experience._id = data._id;

      UpdateExperienceMutation.mutate({ Experience:Experience, _id:_id });
    }
  }
  return (
    <Modal
      trigger={
       
         
              <Icon
                name={iconName}
                color="blue"
                size="big"
                style={{ float: "right", cursor: "pointer", marginLeft: "8px" }}
                disabled={aUthorization}
                data-test={`experienceModal-${data?.jobTitle}`}
              /> 
           
       
       
      }
    >
      <Modal.Content>
        <Form onSubmit={hundlSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="job Title"
              placeholder="job Title"
              onChange={(e) => setJobTitle(e.target.value)}
              required
              value={jobTitle}
              data-test="jobTitle"
            />
            <Form.Input
              fluid
              label="company Name"
              placeholder="company Name"
              onChange={(e) => setCompanyName(e.target.value)}
              required
              data-test="companyName"
              value={companyName}
            />
            <Form.Select
              fluid
              options={jobTypesList}
              label="job Type"
              placeholder="job Type"
              onChange={handleJobTypeChange}
              required
              value={jobType}
              data-test="jobType"
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="start date "
              placeholder="start date"
              onChange={(e) => setStartDate(e.target.value)}
              required
              value={startDate}
              type="date"
              data-test="startDate"
            />
            <Form.Input
              fluid
              label="end date"
              placeholder="end date"
              onChange={(e) => setEndDate(e.target.value)}
              required
              value={endDate}
              data-test="endDate"
              type="date"
            />
            <Dropdown
              placeholder="competences"
              fluid
              multiple
              search
              selection
              options={competenceList}
              onChange={handleDropdownChange}
              value={competences}
              data-test="competences"
            />
          </Form.Group>
          <Form.Group inline>
            <label>Place</label>
            <Radio
              name="place"
              label="Hybride"
              value="Hybride"
              onChange={(e, value) => setPlace(value.value)}
              required
              checked={place === "Hybride"}
              style={{ marginRight: "15px" }}
              data-test="placeHybride"
            />
            <Radio
              name="place"
              label="Online"
              value="Online"
              onChange={(e, value) => setPlace(value.value)}
              required
              checked={place === "Online"}
            
            />
          </Form.Group>

          <Form.TextArea
            label="Description "
            placeholder="Tell us more about your Experience ."
            onChange={(e) => setDesciption(e.target.value)}
            required
            value={description}
            data-test="experienceDesctiption"
          />
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Form.Button
           data-test="experiencebtn"
            color="blue"
            disabled={createExperienceMutation.isLoading}
            loading={createExperienceMutation.isLoading}
          >
            Submit
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
