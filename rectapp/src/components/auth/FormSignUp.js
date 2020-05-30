import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { authSignUp} from "../../reduxSaga/actions/auth.actions";
import { useFormik } from "formik";
import validationSchema from "./ValidationSchemas/ValidationSignUp";

/*Compoenents */
import ErrorField from "../ErrorField";

const FormSignUp = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { error_register, error } = state.auth; // Validación
  
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
            dispatch(
              authSignUp({
                username,
                email,
                password,
                passwordConfirmation,
              })
            );
    }

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
        {error_register && (<ErrorField touched={touched.username} message={error.response.data.username && (error.response.data.username[0])} />)}

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

        {error_register && (<ErrorField touched={touched.email} message={error.response.data.email && (error.response.data.email[0])} />)}

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
