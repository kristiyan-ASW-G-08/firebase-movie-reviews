import * as yup from 'yup';
const ReviewSchema = yup.object({
  content: yup.string().min(20).required(),
});

export default ReviewSchema;
