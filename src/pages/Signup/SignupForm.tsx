import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../components/Form";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { InputPassword } from "../../components/InputPassword";

const signUpSchema = yup.object().shape({
  company: yup.string().required("Campo obrigatório"),
  userName: yup.string().required("Campo obrigatório"),
  userPassword: yup.string().required("Senha obrigatória"),
  confirmPassword: yup.string().required("Campo obrigatório"),
});

interface txtSignup {
  userName: string;
  userPassword: string;
  company: string;
  confirmPassword: string;
}

export const SignupForm = () => {
  const { signUp } = useAuth();
  const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtSignup>({ resolver: yupResolver(signUpSchema) });

  const sender = (data: txtSignup) => {
    signUp(data);
    history("/");
  };

  return (
    <Formulario onSubmit={handleSubmit(sender)}>
      <h1>SignUp</h1>
      <Input
        register={register}
        name="company"
        error={errors.company?.message}
        placeholder="Código"
      />
      <Input
        register={register}
        name="userName"
        error={errors.userName?.message}
        placeholder="Usuário"
      />
      <InputPassword
        register={register}
        name="userPassword"
        error={errors.userPassword?.message}
        placeholder="Senha"
      />
      <InputPassword
        register={register}
        name="confirmPassword"
        error={errors.confirmPassword?.message}
        placeholder="Confirmar Senha"
      />
      <Button>Registrar</Button>
    </Formulario>
  );
};
