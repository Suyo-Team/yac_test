import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../reduxSaga/actions/auth.actions";
import { useFormik } from "formik";
import validationSchema from "./ValidationSchemas/ValidationSignUp";
import { apiCall } from "../../services/services.config";

/*Compoenents */
import ErrorField from "../ErrorField";

const FormSignUp = () => {
  const dispatch = useDispatch();
  const [usernameIsValid, setUsernameIsValid] = useState(null);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      const { username, email, password, passwordConfirmation } = values;

      apiCall("exist/", { username, email }, null, "POST")
        .then((response) => {
          setUsernameIsValid(response.data.length !== 0);
          if (usernameIsValid) {
            dispatch(
              authSignUp({
                username,
                email,
                password,
                passwordConfirmation,
              })
            );
          }
        })
        .catch((error) => {
          setUsernameIsValid(false);
        });
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <form onSubmit={handleSubmit}>
      {usernameIsValid && (
        <div className="alert alert-danger">
          Username y/o correo electronico ya existe
        </div>
      )}

      <div className="form-group">
        <label className="mt-1">Ingrese su usuario</label>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="form-control" // value={}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
        <ErrorField touched={touched.username} message={errors.username} />

        <label className="mt-1">Ingrese su correo electronico</label>
        <input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="form-control"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <ErrorField touched={touched.email} message={errors.email} />

        <label className="mt-1">Ingrese su contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-control"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <ErrorField touched={touched.password} message={errors.password} />

        <label className="mt-1">Confirme su contraseña</label>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirmar contraseña"
          className="form-control"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConfirmation}
        />
        <ErrorField
          touched={touched.passwordConfirmation}
          message={errors.passwordConfirmation}
        />

        <button
          type="submit"
          className="btn btn-info mt-3 w-100 font-weight-bold"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default FormSignUp;
