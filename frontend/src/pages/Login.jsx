import { useFormik } from "formik";
import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import PasswordField from "../components/PasswordField";
import { styled } from "styled-components";
import { API_URL, getCookie } from "../const";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import ApiClient from "../api";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    validationSchema: yup.object({
      username: yup.string().required("Required field"),
      password: yup.string().required("Required field"),
    }),
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const headers = {
          Cookie: `csrftoken=${getCookie("csrftoken")};`,
        };
        const { data } = await ApiClient.post(
          `${API_URL}/auth/login/`,
          values,
          {
            withCredentials: true,
            headers,
          }
        );
        if (data?.token) {
          localStorage.setItem("token", data.token);
          navigate("/foods");
        }
      } catch (error) {}
    },
  });

  return (
    <Form>
      <Typography variant="h3" align="center">
        Login
      </Typography>
      <TextField
        name="username"
        label="Username"
        placeholder="iivanov"
        onChange={formik.handleChange}
        helperText={formik.touched.username && formik.errors.username}
        error={formik.touched.username && formik.errors.username}
      />
      <PasswordField
        name="password"
        label="Password"
        onChange={formik.handleChange}
        helperText={formik.touched.password && formik.errors.password}
        error={formik.touched.password && formik.errors.password}
      />
      <Button variant="contained" onClick={formik.handleSubmit}>
        Submit
      </Button>
      <NavLink style={{ margin: "0 auto" }} to={"/register"}>
        <Button>Don’t have an account?</Button>
      </NavLink>
    </Form>
  );
};

export default Login;

const Form = styled.div`
  height: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 30px;
  margin: 0 auto;
`;
