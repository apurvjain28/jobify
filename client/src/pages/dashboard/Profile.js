import React, { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      // this is on frontend,we are doing it on backend too
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            labelText="name"
            handleChange={(e) => setName(e.target.value)}
          ></FormRow>
          <FormRow
            type="last name"
            name="text"
            value={lastName}
            labelText="Last Name"
            handleChange={(e) => setLastName(e.target.value)}
          ></FormRow>
          <FormRow
            type="email"
            name="email"
            value={email}
            labelText="email"
            handleChange={(e) => setEmail(e.target.value)}
          ></FormRow>
          <FormRow
            type="text"
            name="location"
            value={location}
            labelText="location"
            handleChange={(e) => setLocation(e.target.value)}
          ></FormRow>
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save change"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
