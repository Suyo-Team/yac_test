import React, { useState } from "react";

/*Components */
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";
import Title from "./Title";
import Login from "./Login";
import Register from "./Register";

function Authentication() {
  const [mostrar, setMostrar] = useState(true);
  return (
    <div className="vertical-center">
      <div className="container">
        {mostrar ? (
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 contenido-principal">
              <Title title="Inicio de sesion" />
              <FormLogin />
              <Login setMostrar={setMostrar} />
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 contenido-principal">
              <Title title="Registro" />
              <FormSignUp />
              <Register setMostrar={setMostrar} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Authentication;
