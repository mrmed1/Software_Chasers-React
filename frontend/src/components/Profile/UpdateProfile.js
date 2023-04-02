import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Card, Modal, Form, Icon, Dimmer, Loader } from "semantic-ui-react";
import {
  getAcount,
  updateProfile,
  updateVisibility,
} from "../../Service/studentService";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const queryClient = useQueryClient();
  //For Testing without authentification
  const id = "63a6090c1a0834a51ac5246e";
  const { isLoading, data } = useQuery(["student"], () => getAcount(id), {
    retry: false,
  });

  const visibilityMutation = useMutation(({ id }) => updateVisibility(id), {
    onSuccess: () =>
      toast.success(
        data.isPublic
          ? "Your profile is now private ! "
          : "Your Profile is available for all !"
      ),
    onError: () => toast.error("Oups somthing went wrong !"),

    onSettled: () => {
      queryClient.invalidateQueries("student");
    },
  });

  function onClickIdon() {
    visibilityMutation.mutate({ id: id });
  }

  const UpdateProfileMutation = useMutation(
    (student) => {
      return updateProfile(student);
    },
    {
      onSuccess: () => toast.success("Profile updated successfully !"),
      onError: (error) => toast.error(error.message),
      onSettled: () => queryClient.invalidateQueries("student"),
    }
  );

  if (isLoading)
    return (
      <Dimmer active inverted >
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );

  function hundlSubmit(e) {
    e.preventDefault();
    console.log(FirstName);
    if (password !== confirmPassword) {
      //ReTurn Toast !
      toast.error("Oups Password Unmatched  !");
    } else {
      let stdnt = data;
      if (FirstName !== "") {
        stdnt.firstname = FirstName;
      }
      if (Email !== "") {
        stdnt.email = Email;
      }
      if (LastName !== "") {
        stdnt.lastname = LastName;
      }

      console.log(stdnt);
      UpdateProfileMutation.mutate(stdnt);
    }
  }

  return (
    <>
      <Card centered fluid>
        <Card.Content>
          {/* Update Section  */}
          <Modal
            trigger={
              <Button color="blue" floated="right">
                Update
              </Button>
            }
            header="Update me!"
            actions={[
              "Snooze",
              { key: "done", content: "Done", positive: true },
            ]}
          >
            <Modal.Content>
              <Form onSubmit={hundlSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="First name"
                    defaultValue={data?.firstname}
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Form.Input
                    fluid
                    label="Last name"
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                    defaultValue={data?.lastname}
                    required
                  />
                  <Form.Input
                    fluid
                    type="email"
                    label="Email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={data?.email}
                    required
                    icon={"mail"}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={"lock"}
                  />
                  <Form.Input
                    type="password"
                    icon={"lock"}
                    fluid
                    label="confirm password"
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Checkbox label="I agree to the Terms and Conditions" />
                <Form.Button
                  loading={UpdateProfileMutation.isLoading}
                  disabled={UpdateProfileMutation.isLoading}
                  color="blue"
                >
                  Submit
                </Form.Button>
                {UpdateProfileMutation.error && (
                  <small>{UpdateProfileMutation.error}</small>
                )}
              </Form>
            </Modal.Content>
          </Modal>

          <Card.Header>
            <h1>Personal Information </h1>
          </Card.Header>
          <br />
          {/* Render Profile */}
          <Card.Description>
            <Card.Header>
              <h2>
                {data?.firstname} {data?.lastname}
              </h2>
            </Card.Header>
            <Card.Meta>
              <h4>{data?.role}</h4>
            </Card.Meta>
            <br />
            <Card.Meta>
              From{" "}
              <strong>
                {data?.level} {data?.class}
              </strong>{" "}
            </Card.Meta>
            <Card.Meta>
              <Icon name="calendar times" align left />
              {data?.dob}
            </Card.Meta>
            <Card.Meta>
              <Icon name="mail" align left /> {data?.email}
            </Card.Meta>
            {data?.dog && (
              <Card.Meta>
                <Icon name="graduation" align left /> {data?.dog}
              </Card.Meta>
            )}

            <Card.Meta>
              <Icon
                onClick={onClickIdon}
                name={data.isPublic ? "world" : "privacy"}
                style={{
                  cursor: "pointer",
                  float: "right",
                  marginRight: "25px",
                }}
                size={"big"}
                color={data.isPublic ? "green" : "red"}
              />{" "}
              {data?.dog}
            </Card.Meta>
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
}
