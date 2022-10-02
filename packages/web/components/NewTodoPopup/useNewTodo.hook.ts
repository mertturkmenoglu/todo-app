import { SubmitHandler, useForm } from 'react-hook-form';

export interface NewTodoInputs {
  text: string;
}

export function useNewTodo() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewTodoInputs>();

  const onSubmit: SubmitHandler<NewTodoInputs> = (inp) => {
    console.log(inp);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
  };
}
