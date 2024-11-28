import { object, string } from 'zod';

const formSchema = object({
  email: string().email(),
  password: string().min(6).max(255),
});

export { formSchema };
