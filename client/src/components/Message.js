import React from "react";
import { styled } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";

const PaddedDiv = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function Message({ message }) {
  return (
    <PaddedDiv>
      <Grid container={12} justify="flex-end">
        <Grid item={6}>
          <Typography variant="subtitle1"> {message.from} </Typography>
        </Grid>
      </Grid>
      <Grid container={12}>
        <Grid item={6}>
          <Typography variant="body2"> {message.message} </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid Conditional={12} justify="flex-end">
        <Typography variant="caption"> {message.datetime} </Typography>
      </Grid>
    </PaddedDiv>
  );
}
