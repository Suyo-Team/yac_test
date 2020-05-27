import React from "react";
import { destroySessions } from "../../middlewares/auth.middleware";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark pb-1 mb-3">
      <span className="navbar-brand text-white">
        Bienvenido {localStorage.getItem("username")}
      </span>
      <button
        type="button"
        className="navbar-toggler bg-secondary"
        data-toggle="collapse"
        data-target="#nav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <span className="text-white">Chat online with socket .io</span>
      <div className="navbar-collapse collapse" id="nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              className="btn btn-info font-weight-bold"
              onClick={() => {
                destroySessions();
              }}
            >
              Cerrar Sesion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
