import React from "react";

const ErrorField = ({ touched, message }) => {
  if (!touched) {
    return (
      <div className="form-message text-danger font-weight-bold">&nbsp;</div>
    );
  }
  if (message) {
    return (
      <small id="emailHelp" className="form-text text-danger font-weight-bold">
        {message}
      </small>
    );
  }
  return <br />;
};

export default ErrorField;
