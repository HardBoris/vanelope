import { useForm } from "react-hook-form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { Formulario } from "../../../../components/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  PurchaseData,
  PurchaseDetail,
  elementData,
} from "../../../../context/PurchaseContext";
import "./Details.css";
import { useDetail } from "../../../../context/DetailContext";
import { useEffect } from "react";

const DetailInfoSchema = yup.object().shape({
  element: yup.string().required(),
  quantity: yup.string().required(),
  unit: yup.string().required(),
  cost: yup.string().required(),
  elementType: yup.string().required(),
});

interface DetailsProps {
  elementos: elementData[];
  purchase: PurchaseData;
  setElementos: (data: elementData[]) => void;
  setPurchase: (data: PurchaseData) => void;
}

export const Details = ({
  elementos,
  purchase,
  setElementos,
  setPurchase,
}: DetailsProps) => {
  const { details, DetailsList } = useDetail();
  const context = new AudioContext();

  useEffect(() => {
    DetailsList();
  }, []);

  console.log(details);

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
  } = useForm<PurchaseDetail>({
    resolver: yupResolver(DetailInfoSchema),
  });

  const sender = (info: elementData) => {
    const { element, elementType } = info;
    const material = elementos.filter((item) => item.element === info.element);
    material.length
      ? jsNota(207.652)
      : setElementos([
          ...elementos,
          {
            ...info,
          },
        ]);
    material.length
      ? jsNota(207.652)
      : setPurchase({
          ...purchase,
          details: [
            ...elementos,
            {
              ...info,
            },
          ],
        });
  };

  return (
    <>
      <div className="wrapper-dt">
        <Formulario onSubmit={handleSubmit(sender)}>
          <div className="input-wrapper-dt">
            <div className="input-individual-dt element">
              <BGInput
                register={register}
                name="element"
                error={errors.element?.message}
                label="Elemento"
                placeholder="Descrição do elemento"
              />
            </div>
            <div className="input-individual-dt element-type">
              <BGInput
                register={register}
                name="elementType"
                error={errors.elementType?.message}
                label="Tipo de elemento"
                placeholder="Ferramenta, acessório"
              />
            </div>
            <div className="input-individual-dt quantity">
              <BGInput
                register={register}
                name="quantity"
                error={errors.quantity?.message}
                label="Quantidade"
                placeholder="moveQuantity"
              />
            </div>
            <div className="input-individual-dt unit">
              <BGInput
                register={register}
                name="unit"
                error={errors.unit?.message}
                label="Unidade"
                placeholder="m, k, l"
              />
            </div>
            <div className="input-individual-dt price">
              <BGInput
                register={register}
                name="cost"
                error={errors.cost?.message}
                label="Custo"
                placeholder="Custo Total"
              />
            </div>
          </div>
          <div className="botonera-dt">
            <Button type="button" /* onClick={() => volver()} */>Voltar</Button>
            <Button variant="yes" type="submit">
              Incluir
            </Button>
          </div>
        </Formulario>
      </div>
    </>
  );
};
