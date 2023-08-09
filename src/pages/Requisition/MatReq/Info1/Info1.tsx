import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
import { Requisicion } from "../../../../context/RequisitionContext";
import "./style.css";

const materialRequestSchema = yup.object().shape({
  requestDate: yup.string().required(),
  service: yup.string().required(),
  requestor: yup.string().required(),
});

interface Info1Props {
  setMaterialRequest: (data: Requisicion) => void;
  setShow: (arg: number) => void;
}

export const Info1 = ({ setMaterialRequest, setShow }: Info1Props) => {
  const ahora = Date.now();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Requisicion>({
    resolver: yupResolver(materialRequestSchema),
  });

  const sender = (data: Requisicion) => {
    setMaterialRequest(data);
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
              name="service"
              error={errors.service?.message}
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
