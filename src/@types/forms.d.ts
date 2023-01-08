export type RegistrationFormType = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  state: string;
  hasSelected: boolean;
};

export type LoginForm = {
  email: string;
  password: string;
};
