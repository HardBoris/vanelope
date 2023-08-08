import { Formulario } from "../../../components/Form";
import { Input } from "../../../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/Button";
import "./Form1.style.css";
import { useNavigate } from "react-router-dom";
import {
  Requisicion,
  useRequisition,
} from "../../../context/RequisitionContext";

const requestSchema = yup.object().shape({
  requestDate: yup.string().required(),
  requestTarget: yup.string().required(),
  requestor: yup.string().required(),
});

export const Form1 = () => {
  const navigate = useNavigate();
  const { setSolicitud } = useRequisition();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Requisicion>({ resolver: yupResolver(requestSchema) });

  const sender = (data: Requisicion) => {
    const { requestDate } = data;
    const fecha = requestDate.split("/");
    const formated = [fecha[1], fecha[0], fecha[2]].join("/");
    setSolicitud({ ...data, requestDate: formated, movements: [] });
    navigate("/requisitions/form2");
  };

  return (
    <div className="form-wrapper">
      <Formulario onSubmit={handleSubmit(sender)}>
        <div className="input-horizontal-wrapper">
          <div className="input-individual">
            <Input
              register={register}
              name="requestDate"
              error={errors.requestDate?.message}
              label="Data"
              placeholder="dd/mm/aaaa"
              isPassword={false}
            />
          </div>
          <div className="input-individual">
            <Input
              register={register}
              name="requestTarget"
              error={errors.requestTarget?.message}
              label="Ordem de Serviço"
              placeholder="Número da ordem"
              isPassword={false}
            />
          </div>
        </div>
        <div className="input-individual">
          <Input
            register={register}
            name="requestor"
            error={errors.requestor?.message}
            label="Solicitante"
            placeholder="Nome do solicitante"
            isPassword={false}
          />
        </div>
        <Button type="submit" variant="yes">
          Avançar
        </Button>
      </Formulario>
    </div>
  );
};
