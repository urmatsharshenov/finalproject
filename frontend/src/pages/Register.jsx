import { useFormik } from "formik";
import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import PasswordField from "../components/PasswordField";
import { styled } from "styled-components";
import { API_URL } from "../const";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import ApiClient from "../api";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: yup.object({
      email: yup.string().email().required("Required field"),
      first_name: yup.string().required("Required field"),
      last_name: yup.string().required("Required field"),
      username: yup.string().required("Required field"),
      password: yup.string().required("Required field"),
    }),
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await ApiClient.post(`${API_URL}/auth/register`, values);
        navigate("/login");
      } catch (error) {}
    },
  });

  return (
    <Form>
      <Typography variant="h3" align="center">
        Registration
      </Typography>
      <TextField
        name="first_name"
        label="First Name"
        placeholder="Ivan"
        onChange={formik.handleChange}
        helperText={formik.touched.first_name && formik.errors.first_name}
        error={formik.touched.first_name && formik.errors.first_name}
      />
      <TextField
        name="last_name"
        label="Last Name"
        placeholder="Ivanov"
        onChange={formik.handleChange}
        helperText={formik.touched.last_name && formik.errors.last_name}
        error={formik.touched.last_name && formik.errors.last_name}
      />
      <TextField
        name="username"
        label="Username"
        placeholder="iivanov"
        onChange={formik.handleChange}
        helperText={formik.touched.username && formik.errors.username}
        error={formik.touched.username && formik.errors.username}
      />
      <TextField
        name="email"
        label="Email address"
        placeholder="ivan.ivanov@qwe.qwe"
        onChange={formik.handleChange}
        helperText={formik.touched.email && formik.errors.email}
        error={formik.touched.email && formik.errors.email}
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
      <NavLink style={{ margin: "0 auto" }} to={"/login"}>
        <Button>Go to Login</Button>
      </NavLink>
    </Form>
  );
};

export default Register;

const Form = styled.div`
  height: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 30px;
  margin: 0 auto;
`;
