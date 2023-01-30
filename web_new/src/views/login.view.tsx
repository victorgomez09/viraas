interface FormValues {
  email: string;
  password: string;
}

export function Login() {
  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);
  };

  return <div>Login</div>;
}
