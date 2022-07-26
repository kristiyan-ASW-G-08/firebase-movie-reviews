import * as yup from 'yup';
const LoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default LoginSchema;
