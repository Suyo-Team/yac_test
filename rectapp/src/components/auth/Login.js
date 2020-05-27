import React, { Fragment } from "react";

const Login = ({ setMostrar }) => {
  return (
    <Fragment>
      <button
        className="btn btn-secondary mt-1 w-100 font-weight-bold"
        onClick={() => {
          setMostrar(false);
        }}
      >
        Registrarse
      </button>
    </Fragment>
  );
};

export default Login;
