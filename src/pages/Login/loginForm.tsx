import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../components/Form";
import "./login.style.css";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { InputPassword } from "../../components/InputPassword";

const signInSchema = yup.object().shape({
  company: yup.string().required("Campo obrigatório"),
  userName: yup.string().required("Campo obrigatório"),
  userPassword: yup.string().required("Senha obrigatória"),
});

interface txtData {
  userName: string;
  userPassword: string;
  company: string;
}

export const LoginForm = () => {
  const { signIn } = useAuth();
  const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtData>({ resolver: yupResolver(signInSchema) });

  const sender = (data: txtData) => {
    signIn(data);
    history("/");
  };

  return (
    <Formulario onSubmit={handleSubmit(sender)}>
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
      <Button>Entrar</Button>
    </Formulario>
  );
};
