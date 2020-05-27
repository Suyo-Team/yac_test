import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../reduxSaga/actions/auth.actions";
import { useFormik } from "formik";
import validationSchema from "./ValidationSchemas/ValidationLogin";

/*Components */
import ErrorField from "../ErrorField";

const FormLogin = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { login_error } = state.auth_login;

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const { username, password } = values;

      dispatch(
        authLogin({
          username: username,
          password: password,
        })
      );
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
      {login_error && (
        <p className="alert-danger">Usuario y/o contraseña incorrecta </p>
      )}

      <label className="mt-1">Ingrese su usuario</label>
      <input
        name="username"
        placeholder="Ingrese su usuario"
        type="text"
        className="form-control"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      <ErrorField touched={touched.username} message={errors.username} />

      <label className="mt-1">Ingrese su contraseña</label>
      <input
        name="password"
        placeholder="Ingrese su contraseña"
        type="password"
        className="form-control"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      ></input>

      <ErrorField touched={touched.password} message={errors.password} />

      <button
        type="submit"
        className="btn btn-info mt-3 mb-2 w-100 font-weight-bold"
      >
        Ingresar
      </button>
    </form>
  );
};

export default FormLogin;
