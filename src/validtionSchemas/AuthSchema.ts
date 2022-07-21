import * as yup from 'yup';
const AuthSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default AuthSchema;
