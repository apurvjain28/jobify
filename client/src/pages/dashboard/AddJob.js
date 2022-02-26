import React from "react";
import { FormRowSelect, FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    isEditing,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      console.log(`${isEditing}`);
      editJob();
      return;
    }
    createJob();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="company"
            value={company}
            labelText="company"
            handleChange={handleJobInput}
          ></FormRow>
          <FormRow
            type="text"
            name="position"
            value={position}
            labelText="position"
            handleChange={handleJobInput}
          ></FormRow>
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labelText="job Location"
            handleChange={handleJobInput}
          ></FormRow>
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            labelText="status"
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            labelText="Job Type"
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
