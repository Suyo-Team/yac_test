import React from "react";
import {
  Grid,
  Paper as MuiPaper,
  Button as MuiButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import UserAuthFields from "../components/UserAuthFields";

import { sendLogin } from "../redux/action/authenticateUser";

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const CenterLink = styled("div")(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(1),
}));

const Button = styled(MuiButton)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

function Login(props) {
  const { handleSubmit, control } = useForm();
  const handleSend = (form) => {
    props.sendLogin(form.username, form.password);
  };
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6}>
        <Paper>
          <form onSubmit={handleSubmit(handleSend)}>
            <UserAuthFields control={control} />
            <CenterLink>
              <Link to="/signup"> Sign up </Link>
            </CenterLink>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLogin: (username, password) => dispatch(sendLogin(username, password)),
  };
};

const wrapper = connect(null, mapDispatchToProps);
const component = wrapper(Login);

export default component;
