import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
import { ToolMovement, ToolRequest } from "..";
import "./style.css";

const toolMovementSchema = yup.object().shape({
  moveElement: yup.string().required(),
  elementType: yup.string().required(),
  elementCode: yup.string().required(),
});

interface Info2Props {
  movimientos: ToolMovement[];
  toolRequest: ToolRequest;
  setMovimientos: (data: ToolMovement[]) => void;
  setShow: (arg: number) => void;
  setToolRequest: (data: ToolRequest) => void;
}

interface ToolMovementInfo {
  moveElement: string;
  elementType: string;
  elementCode: string;
}

export const Info2 = ({
  movimientos,
  setMovimientos,
  setShow,
  setToolRequest,
  toolRequest,
}: Info2Props) => {
  const context = new AudioContext();

  function jsNota(frecuencia: number) {
    const o = context.createOscillator();
    const g = context.createGain();
    o.connect(g);
    o.type = "sawtooth";
    o.frequency.value = frecuencia;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1.5);
  }

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ToolMovementInfo>({ resolver: yupResolver(toolMovementSchema) });

  const sender = (info: ToolMovementInfo) => {
    const move = movimientos.filter(
      (item) => item.moveElement === info.moveElement
    );
    move.length
      ? jsNota(207.652)
      : setMovimientos([
          ...movimientos,
          {
            ...info,
            moveType: "saída",
            moveQuantity: 1,
            moveUnit: "unidade(s)",
          },
        ]);
    move?.length
      ? jsNota(207.652)
      : setToolRequest({
          ...toolRequest,
          movements: [
            ...movimientos,
            {
              ...info,
              moveType: "saída",
              moveQuantity: 1,
              moveUnit: "unidade(s)",
            },
          ],
        });
  };

  const volver = () => {
    setShow(0);
  };

  return (
    <>
      <div className="wrapper-tr2">
        <Formulario clase="" onSubmit={handleSubmit(sender)}>
          <div className="input-wrapper-tr2">
            <div className="input-individual-tr2">
              <Modificado
                register={register}
                name="moveElement"
                error={errors.moveElement?.message}
                label="Elemento"
                placeholder="Descrição do elemento"
              />
            </div>
            <div className="input-individual">
              <Modificado
                register={register}
                name="elementType"
                error={errors.elementType?.message}
                label="Tipo de elemento"
                placeholder="Ferramenta, acessório"
              />
            </div>
            <div className="input-individual">
              <Modificado
                register={register}
                name="elementCode"
                error={errors.elementCode?.message}
                label="Lacre"
                placeholder="elementCode"
              />
            </div>
          </div>
          <div className="botonera">
            <Button type="button" onClick={() => volver()}>
              Voltar
            </Button>
            <Button variant="yes" type="submit">
              Incluir
            </Button>
          </div>
        </Formulario>
      </div>
    </>
  );
};
