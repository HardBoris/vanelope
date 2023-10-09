import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Button } from "../../../../components/Button";
import { ToolRequest } from "..";
import "./style.css";
import { BGInput } from "../../../../components/BG Input";

const toolRequestSchema = yup.object().shape({
  requestDate: yup.string().required(),
  service: yup.string().required(),
  requestor: yup.string().required(),
});

interface Info1Props {
  setToolRequest: (data: ToolRequest) => void;
  setShow: (arg: number) => void;
}

export const Info1 = ({ setToolRequest, setShow }: Info1Props) => {
  const ahora = Date.now();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ToolRequest>({ resolver: yupResolver(toolRequestSchema) });

  const sender = (data: ToolRequest) => {
    setToolRequest(data);
    setShow(1);
  };

  return (
    <div className="form-wrapper-tr1">
      <Formulario clase="" onSubmit={handleSubmit(sender)}>
        <div className="input-wrapper-tr1">
          <div className="input-individual-tr1">
            <BGInput
              register={register}
              name="requestDate"
              error={errors.requestDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
          <div className="input-individual-tr1">
            <BGInput
              register={register}
              name="service"
              error={errors.service?.message}
              label="Ordem de Serviço"
              placeholder="Número da ordem"
            />
          </div>
        </div>
        <div className="input-tr1">
          <BGInput
            register={register}
            name="requestor"
            error={errors.requestor?.message}
            label="Solicitante"
            placeholder="Nome do solicitante"
          />
        </div>
        <div className="input-tr1">
          <Button type="submit" variant="yes">
            Avançar
          </Button>
        </div>
      </Formulario>
    </div>
  );
};
