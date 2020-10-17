import React from "react";
import {
  TextField as MuiTextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@material-ui/icons";

const TextField = styled(MuiTextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "97%"
}));

export default function UserAuthFields() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <TextField variant="outlined" name="username" label="username" />
      <TextField
        variant="outlined"
        name="password"
        type={showPassword ? "text" : "password"}
        label="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
