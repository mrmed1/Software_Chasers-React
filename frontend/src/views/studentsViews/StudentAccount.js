import React from "react";
import UpdateProfile from "../../components/Profile/UpdateProfile";

import CV from "../../components/Profile/CV";
import { Toaster } from "react-hot-toast";
export default function StudentAccount() {
  return (
    <>
      <Toaster />
      <UpdateProfile />
      <CV />
    </>
  );
}
