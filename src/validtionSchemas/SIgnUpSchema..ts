import * as yup from 'yup';
const SignUpSchema = yup.object({
  username: yup.string().min(5).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default SignUpSchema;
