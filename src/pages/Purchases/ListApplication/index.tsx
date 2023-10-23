import { FaPlus, FaTrash } from "react-icons/fa";
import {
  ElementApplicationFormShape,
  useElementApplicationForm,
} from "./ElementApplicationForm";
import { Button } from "../../../components/Button";
import { Formulario } from "../../../components/Form";
import { useState } from "react";
import { ElementToBuy } from "../../../context/ElementContext";
import { ElementSection } from "./ElementSection";

interface DetailsProps {
  elementos: ElementToBuy[];
  setElementos: (data: ElementToBuy[]) => void;
}

export const ElementApplication = () => {
  const [detalle, setDetalle] = useState<ElementToBuy>({} as ElementToBuy);
  const form = useElementApplicationForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

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

  const sender = (info: ElementApplicationFormShape) => {
    console.log(info);
    // const { elementsList } = info;

    /* const lista: ElementToBuy = elementos.filter(
          (item) => item?.element === element
        )[0];
     */
    /* if (!elemento) {
          ElementCreator(info);
        } */

    // const material = elementos.filter((item) => item.element === element);

    /* material.length
          ? jsNota(207.652)
          : setElementos([
              ...elementos,
              {
                ...info,
              },
            ]); */
    // console.log(elementos);
  };

  return (
    <div className="wrapper-dt">
      {/* <div className="input-purchase date">
                <BGInput
                  register={register}
                  name="listDate"
                  error={errors.listDate?.message}
                  label="Data"
                  defaultValue={new Date(ahora).toLocaleDateString()}
                />
              </div> */}
      <Formulario onSubmit={handleSubmit(sender)}>
        <ElementSection form={form}></ElementSection>
        <Button type="submit">Enviar</Button>
      </Formulario>
      {/* <div className="data-show">
        {elementos &&
          elementos.map((item, index) => (
            <div key={index} className="data-row">
              <div className="detail-wrapper-dt">
                <div className="individual-detail element-dt">
                  <div className="show">{item.element}</div>
                </div>
                <div className="individual-detail type-dt">
                  <div className="show">{item.elementType}</div>
                </div>
                <div className="individual-detail qty-dt">
                  <div className="show">{item.quantity}</div>
                </div>
                <div className="individual-detail unit-dt">
                  <div className="show">{item.defaultUnit}</div>
                </div>
              </div>
              <div className="botonera-dt">
                <Button
                  variant="yes"
                  type="button"
                  onClick={handleSubmit(sender)}
                >
                  Eliminar
                </Button>
              </div>
              <div className="detail-action">
                <div
                  className="detail-btn"
                  // onClick={() => Trigger(item.requestId, setIsDelete)}
                >
                  <FaTrash />
                </div>
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
};
