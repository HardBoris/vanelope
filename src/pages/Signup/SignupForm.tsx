import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../components/Form";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const signUpSchema = yup.object().shape({
  companyCode: yup.string().required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Senha obrigatória"),
  confirmPassword: yup.string().required("Campo obrigatório"),
});

interface txtSignup {
  name: string;
  password: string;
  companyCode: string;
  confirmPassword: string;
}

export const SignupForm = () => {
  const { signUp } = useAuth();
  // const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtSignup>({ resolver: yupResolver(signUpSchema) });

  const sender = (data: txtSignup) => {
    console.log(data);
    signUp(data);
  };

  return (
    <Formulario clase="" onSubmit={handleSubmit(sender)}>
      <h1>SignUp</h1>
      <Input
        register={register}
        name="companyCode"
        error={errors.companyCode?.message}
        placeholder="Código"
        isPassword={false}
      />
      <Input
        register={register}
        name="name"
        error={errors.name?.message}
        placeholder="Usuário"
        isPassword={false}
      />
      <Input
        register={register}
        name="password"
        error={errors.password?.message}
        placeholder="Senha"
        isPassword={true}
      />
      <Input
        register={register}
        name="confirmPassword"
        error={errors.confirmPassword?.message}
        placeholder="Confirmar Senha"
        isPassword={true}
      />
      <Button type="submit">Registrar</Button>
    </Formulario>
  );
};
