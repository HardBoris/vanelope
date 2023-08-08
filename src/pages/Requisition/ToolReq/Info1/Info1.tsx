import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
import { ToolRequest } from "..";
import "./style.css";

const toolRequestSchema = yup.object().shape({
  requestDate: yup.string().required(),
  requestTarget: yup.string().required(),
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
    <div className="form-wrapper">
      <Formulario onSubmit={handleSubmit(sender)}>
        <div className="input-horizontal-wrapper">
          <div className="input-individual">
            <Modificado
              register={register}
              name="requestDate"
              error={errors.requestDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
          <div className="input-individual">
            <Modificado
              register={register}
              name="requestTarget"
              error={errors.requestTarget?.message}
              label="Ordem de Serviço"
              placeholder="Número da ordem"
            />
          </div>
        </div>
        <div className="input-individual">
          <Modificado
            register={register}
            name="requestor"
            error={errors.requestor?.message}
            label="Solicitante"
            placeholder="Nome do solicitante"
          />
        </div>
        <Button type="submit" variant="yes">
          Avançar
        </Button>
      </Formulario>
    </div>
  );
};
