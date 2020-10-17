import React from "react";
import {
  TextField as MuiTextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons";
import { Controller } from "react-hook-form";

const TextField = styled(MuiTextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "97%",
}));

export default function UserAuthFields({ control }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Controller
        as={TextField}
        variant="outlined"
        name="username"
        label="username"
        control={control}
        defaultValue=""
      />
      <Controller
        as={TextField}
        control={control}
        defaultValue=""
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
