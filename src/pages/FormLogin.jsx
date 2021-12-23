import React, { useState, useEffect } from "react";
import { Button, Link, TextField, Typography } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const FormLogin = ({ rol }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [credencialsValid, setCredencialsValid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      // navigate.push('/add')
    }
  }, []);
  const validarCorreo = (email) => {
    const expReg =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const isValid = expReg.test(email);
    isValid ? setEmailValid(false) : setEmailValid(true);
    return isValid;
  };

  const heartStyle = { color: "red" };
  const inputStyle = { padding: "8px 0" };
  const buttonStyle = {
    backgroundColor: "#075c2c",
    padding: "5px 0",
    margin: "5px 0",
  };

  const dataLogin = async () => {
    try {
      const item = { email, password };
      let direction = "";
      if (rol === "Contador") direction = "http://localhost:8000/auth/account";
      else direction = "http://localhost:8000/auth/users";

      const emailIsValid = validarCorreo(email);
      if (emailIsValid) {
        localStorage.removeItem('user-info');
        const result = await fetch(direction, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const res = await result.json();
        if (res.status) {
          setCredencialsValid(false);
          console.log('se creo el token y se almaceno')
          localStorage.setItem("user-info", JSON.stringify(res.token));
        } else {
          setCredencialsValid(true);
        }
      }
    } catch (err) {
      console.log("error en login ", err);
    }
  };

  return (
    <>
      <TextField
        label="Email"
        placeholder="Ingrese Email"
        color="success"
        required
        fullWidth
        style={inputStyle}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>

      <TextField
        label="Password"
        placeholder="Ingrese Password"
        color="success"
        type="password"
        required
        fullWidth
        style={inputStyle}
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>

      <FormControlLabel
        style={inputStyle}
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite style={heartStyle} />}
          />
        }
        label="Recordar Usuario"
      />

      <Button
        type="submit"
        style={buttonStyle}
        variant="contained"
        fullWidth
        onClick={dataLogin}
      >
        Ingresar
      </Button>
      <Typography align="center">
        <Link href="#" underline="hover">
          <h6>¿Olvidaste la contraseña?</h6>
        </Link>
        <h5>
          ¿No tienes cuenta?
          <Link href="#" underline="hover">
            Registrate
          </Link>
        </h5>
        {credencialsValid && <p>El usuario o contraseña son incorrectos</p>}
        {emailValid && <p>Los datos son incorrectos</p>}
      </Typography>
    </>
  );
};

export default FormLogin;