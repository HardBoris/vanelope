import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
import { Movement } from "../../../../context/MoveContext";
// import { Requisicion } from "../../../../context/RequisitionContext";
import { Entry, EntryInfo } from "../../../../context/EntryContext";
import "./style.css";

const materialMovementSchema = yup.object().shape({
  moveElement: yup.string().required(),
  elementType: yup.string().required(),
  moveQuantity: yup.number().required(),
  moveUnit: yup.string().required(),
});

interface InfoEntry2Props {
  movimientos: Movement[];
  materialEntry: EntryInfo;
  setMovimientos: (data: Movement[]) => void;
  setShow: (arg: number) => void;
  setMaterialEntry: (data: EntryInfo) => void;
}

interface MaterialMovementInfo {
  moveElement: string;
  elementType: string;
  moveQuantity: number;
  moveUnit: string;
}

export const InfoEntry2 = ({
  movimientos,
  setMovimientos,
  setShow,
  setMaterialEntry,
  materialEntry,
}: InfoEntry2Props) => {
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
  } = useForm<MaterialMovementInfo>({
    resolver: yupResolver(materialMovementSchema),
  });

  const sender = (info: MaterialMovementInfo) => {
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
          },
        ]);
    move?.length
      ? jsNota(207.652)
      : setMaterialEntry({
          ...materialEntry,
          movements: [
            ...movimientos,
            {
              ...info,
              moveType: "entrada",
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
                name="moveQuantity"
                error={errors.moveQuantity?.message}
                label="Quantidade"
                placeholder="moveQuantity"
              />
            </div>
            <div className="input-individual">
              <Modificado
                register={register}
                name="moveUnit"
                error={errors.moveUnit?.message}
                label="Unidade"
                placeholder="moveUnit"
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
