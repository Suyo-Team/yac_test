import React from "react";
import { styled } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";

const PaddedDiv = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function Message({ message, align }) {
  const justify = align === "right" ? "flex-start" : "flex-end";
  return (
    <PaddedDiv>
      <Grid container={12} justify={justify}>
        <Grid item={8}>
          <Typography variant="subtitle1"> {message.from} </Typography>
        </Grid>
      </Grid>
      <Grid container={12}>
        <Grid item={8}>
          <Typography variant="body2"> {message.message} </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container={12} justify={justify}>
        <Grid item={8}>
          <Typography variant="caption"> {message.datetime} </Typography>
        </Grid>
      </Grid>
    </PaddedDiv>
  );
}
