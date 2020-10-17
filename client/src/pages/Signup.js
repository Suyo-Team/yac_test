import React from "react";
import {
  Grid,
  Paper as MuiPaper,
  Button as MuiButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UserAuthFields from "../components/UserAuthFields";

import { sendSignup } from "../redux/action/authenticateUser";

import { isLoggedIn } from "../utils";

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const Button = styled(MuiButton)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

function Signup(props) {
  const { handleSubmit, control } = useForm();
  const handleSend = (form) => {
    props.sendSignup(form.username, form.password);
  };
  if (isLoggedIn(props.login.authToken))
    return <Redirect from={props.location} to="/" />;
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
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendSignup: (username, password) =>
      dispatch(sendSignup(username, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const wrapper = connect(mapStateToProps, mapDispatchToProps);
const component = wrapper(Signup);

export default component;
