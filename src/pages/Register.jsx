import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/UseRedirectActiveUser";
import * as Yup from "yup";
import { Formik } from "formik";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
const Register = () => {
  const { user } = useUserContext();

  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    const { email, password } = values;
    console.log(values);
    try {
      const credentialUser = await register({ email, password });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "User already exist" });
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
        <HowToRegIcon />
      </Avatar>
      <Typography variant="h3" my={4} fontWeight={700}>
        Register
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
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
              sx={{ mb: 2 }}
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
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
              sx={{ mb: 2 }}
            />

            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{ bgcolor: "#000000", py: 2, px: 3, fontWeight: "700" }}
              loading={isSubmitting}
              fullWidth
            >
              Register
            </LoadingButton>      
            <Button component={Link} fullWidth to='/'> Login ?</Button>           
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
