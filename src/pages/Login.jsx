import { Formik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { LoadingButton } from "@mui/lab";
const Login = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    const { email, password } = values;
    console.log(values);
    try {
      const credentialUser = await login({ email, password });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "User not found" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ password: "Incorrect Password" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect Email").required("Email is required"),
    password: Yup.string()
      .trim()
      .min(6, "Password needs min 6 characters")
      .required("Password is required"),
  });

  return (
    <Box sx={{ mt: 8, maxWidth: "500px", mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#000000" }}>
        <VpnKeyIcon />
      </Avatar>
      <Typography variant="h3" my={4} fontWeight={700}>       
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <Box onSubmit={handleSubmit} component="form">
            <TextField
              type="text"
              placeholder="email@onthefuze.com"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              id="email"
              label="Email"
              fullWidth
              sx={{ mb: 2 }}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />

            <TextField
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Password"
              fullWidth
              sx={{ mb: 2 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />
            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{ bgcolor: "#000000", py: 2, px: 3, fontWeight: "700" }}
              loading={isSubmitting}
              fullWidth
            >             
              Login
            </LoadingButton>  

            <Button component={Link} fullWidth to='/register'> Register ?</Button>        
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
