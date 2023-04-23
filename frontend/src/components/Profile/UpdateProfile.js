import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Button,
  Card,
  Modal,
  Form,
  Icon,
  Dimmer,
  Loader,
  Popup,
} from "semantic-ui-react";
import {
  getAcount,
  toggleStyleCv,
  updateProfile,
  updateVisibility,
} from "../../Service/studentService";
import toast from "react-hot-toast";
import { connectedUser } from "../../Service/auth.service";
import CV from "./CV";

export default function UpdateProfile() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState("");

  const queryClient = useQueryClient();
  //For Testing without authentification
  const id = connectedUser()._id;
  const { isLoading, data } = useQuery(["student"], () => getAcount(id), {
    retry: false,
  });

  const visibilityMutation = useMutation(({ id }) => updateVisibility(id), {
    onSuccess: () =>
      toast.success(
        data?.isPublic
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
      onError: (error) => toast.error(error?.response?.data?.codeName),
      onSettled: () => queryClient.invalidateQueries("student"),
    }
  );
  const toggleStyleMutation = useMutation(() => toggleStyleCv(), {
    onSuccess: (data) => toast.success(data),
    onError: (err) => toast.success(err.message),
    onSettled: () => queryClient.invalidateQueries("student"),
  });
  if (isLoading)
    return (
      <Dimmer active inverted>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );

  function hundlSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      //ReTurn Toast !
      toast.error("Oups Password Unmatched  !");
      return;
    } else {
      let stdnt = data;

      if (FirstName !== "") {
        stdnt.firstname = FirstName;
      }
      if (Email !== "") {
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(Email)) {
          toast.error("Please Enter Valid Email !");
          return;
        }
        stdnt.email = Email;
      }

      if (LastName !== "") {
        stdnt.lastname = LastName;
      }
      if (password.length < 8) {
        toast.error("Password should be at least 8 characters long");

        return;
      }
      stdnt.password = password;
      if (login.length < 4) {
        toast.error("Enter a valid Login");

        return;
      }
      stdnt.login = login;

      console.log("student State Updated", stdnt);
      try {
        UpdateProfileMutation.mutate(stdnt);
      } catch (error) {
        console.log(error);
        toast.error("Bad Requests");
      }
    }
  }
  let style;
  const darkMode = {
    card: { backgroundColor: "#23283e" },
    header: { color: "#cdcdff" },
    btn: { color: "#5bc0de " },
    text: { color: "#bdbddd" },
    text2: { color: "#f2f2f2" },
  };
  const lightMode = {
    card: { backgroundColor: "" },
    header: { color: "" },
    btn: { color: "" },
    text: { color: "black" },
    text2: { color: "" },
  };

  if (data.style === "dark") {
    style = darkMode;
  } else {
    style = lightMode;
  }
  function toggleStyleIcon(){
    toggleStyleMutation.mutate();
  }

  return (
    <>
      {data && (
        <Card centered fluid style={style.card}>
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
                      label="Login"
                      type="text"
                      placeholder="Login"
                      onChange={(e) => setLogin(e.target.value)}
                      required
                      icon={"user"}
                      defaultValue={data?.login}
                    />
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
              <h1 style={style.header}>Personal Informations </h1>
            </Card.Header>
            <br />
            {/* Render Profile */}
            <Card.Description>
              <Card.Header>
                <h2 style={{ color: "#1976D2" }}>
                  {data?.firstname} {data?.lastname}
                </h2>
              </Card.Header>
              <Card.Meta>
                <h4 style={style.text}>
                  {" "}
                  Logged as{" "}
                  <strong style={{ color: "#1976D2" }}>{data?.login}</strong>
                </h4>
              </Card.Meta>
              <Card.Meta>
                <h4 style={style.text2}>{data?.role}</h4>
              </Card.Meta>
              <br />
              <Card.Meta>
                <strong style={style.text2}>
                  Level : {data?.level} ,Class: {data?.class}
                </strong>{" "}
              </Card.Meta>
              {data?.dob && (
                <Card.Meta style={style.text2}>
                  <Icon name="calendar times" align left />
                  {data?.dob}
                </Card.Meta>
              )}
              <Card.Meta style={style.text2}>
                <Icon name="mail" align left /> {data?.email}
              </Card.Meta>
              {data?.dog && (
                <Card.Meta style={style.text2}>
                  <Icon name="graduation" align left /> {data?.dog}
                </Card.Meta>
              )}

              <Card.Meta>
              <Icon
              onClick={toggleStyleIcon}
              color={data?.style==="dark"?"teal":"grey"}
                 size={"big"}
                  name={data?.style==="dark"?"sun":"moon"}
                  style={{
                    cursor: "pointer",
                    float: "right",
                    marginRight: "25px",
                  }}
                />
                <Popup
                  content={"You can change your account visibility Here"}
                  header={
                    data?.isPublic
                      ? " Make Your Account Private"
                      : " Make Your Account Public"
                  }
                  trigger={
                    <Icon
                      onClick={onClickIdon}
                      name={data?.isPublic ? "world" : "privacy"}
                      style={{
                        cursor: "pointer",
                        float: "right",
                        marginRight: "25px",
                      }}
                      size={"big"}
                      color={data?.isPublic ? "green" : "red"}
                    />
                  }

                />
                
             
                
                {" "}
                {data?.dog}
              </Card.Meta>
            </Card.Description>
          </Card.Content>
        </Card>
      )}
      <CV Mode={style} />
    </>
  );
}
