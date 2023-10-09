import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
import { ToolEntry, ToolEntryInfo, ToolEntryMovement } from "..";
import "./style.css";

const toolMovementSchema = yup.object().shape({
  moveElement: yup.string().required(),
  elementType: yup.string().required(),
  elementCode: yup.string().required(),
});

interface InfoToolEntry2Props {
  movimientos: ToolEntryMovement[];
  toolEntry: ToolEntryInfo;
  setMovimientos: (data: ToolEntryMovement[]) => void;
  setShow: (arg: number) => void;
  setToolEntry: (data: ToolEntryInfo) => void;
}

interface ToolMovementInfo {
  moveElement: string;
  elementType: string;
  elementCode: string;
}

export const InfoToolEntry2 = ({
  movimientos,
  setMovimientos,
  setShow,
  setToolEntry,
  toolEntry,
}: InfoToolEntry2Props) => {
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
            moveType: "entrada",
            moveQuantity: 1,
            moveUnit: "unidade(s)",
          },
        ]);
    move?.length
      ? jsNota(207.652)
      : setToolEntry({
          ...toolEntry,
          movements: [
            ...movimientos,
            {
              ...info,
              moveType: "entrada",
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
      <div className="wrapper">
        <Formulario clase="" onSubmit={handleSubmit(sender)}>
          <div className="input-horizontal-wrapper">
            <div className="input-individual">
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
