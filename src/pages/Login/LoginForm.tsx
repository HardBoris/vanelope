import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../components/Form";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
// import { Input } from "../../components/oldInput";
import { Button } from "../../components/Button";
// import { InputPassword } from "../../components/oldInputPassword";
import { Input } from "../../components/Input";

const signInSchema = yup.object().shape({
  prueba: yup.string().required("Campo obrigatório"),
  companyCode: yup.string().required("Campo obrigatório"),
  userName: yup.string().required("Campo obrigatório"),
  userPassword: yup.string().required("Senha obrigatória"),
});

interface txtData {
  userName: string;
  userPassword: string;
  companyCode: string;
  prueba: string;
}

export const LoginForm = () => {
  const { signIn, company } = useAuth();
  const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtData>({ resolver: yupResolver(signInSchema) });

  const sender = (data: txtData) => {
    signIn(data);
  };

  return (
    <Formulario onSubmit={handleSubmit(sender)}>
      <h1>LogIn</h1>
      <Input
        register={register}
        name="companyCode"
        error={errors.companyCode?.message}
        placeholder="Código"
        isPassword={false}
      />
      <Input
        register={register}
        name="userName"
        error={errors.userName?.message}
        placeholder="Usuário"
        isPassword={false}
      />
      <Input
        register={register}
        name="userPassword"
        error={errors.userPassword?.message}
        placeholder="Senha"
        isPassword={true}
      />
      <Button>Entrar</Button>
    </Formulario>
  );
};
