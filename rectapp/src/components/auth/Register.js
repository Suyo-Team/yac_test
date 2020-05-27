import React from "react";

const Register = ({ setMostrar }) => {
  return (
    <button
      className="btn btn-danger w-100 font-weight-bold"
      onClick={() => {
        setMostrar(true);
      }}
    >
      Cancelar
    </button>
  );
};

export default Register;
