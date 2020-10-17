import React from "react";
import {
  Grid,
  Paper as MuiPaper,
  Button as MuiButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import UserAuthFields from "../components/UserAuthFields";

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(1),
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
            <Button variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
