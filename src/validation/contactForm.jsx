import * as yup from "yup";

export const contactSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email format") 
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email must be a valid Gmail address"
      ) 
      .required("Email is required"),
    message: yup.string().required("Message is required"),
  });