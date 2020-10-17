import React from "react";
import {
  Grid,
  Paper as MuiPaper,
  Button as MuiButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import UserAuthFields from "../components/UserAuthFields";

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

export default function Login() {
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
          <form>
            <UserAuthFields />
            <CenterLink>
              <Link to="/signup"> Sign up </Link>
            </CenterLink>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
