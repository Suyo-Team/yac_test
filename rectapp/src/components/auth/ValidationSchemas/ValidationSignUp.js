import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Este campo es requerido"),
  email: Yup.string()
    .email("El formato debe ser correo electronico")
    .required("Este campo es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener un mínimo de 8 caracteres")
    .required("Este campo es requerido"),
  passwordConfirmation: Yup.string()
    .min(8, "La contraseña debe tener un mínimo de 8 caracteres")
    .test('passwords-match', 'Las contraseñas debe de ser iguales', function(value) {
        return this.parent.password === value;
    })
    .required("Este campo es requerido")
});

export default ValidationSchema;