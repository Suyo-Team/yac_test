import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Este campo es requerido"),
  password: Yup.string()
    .required("Este campo es requerido"),
});

export default ValidationSchema;