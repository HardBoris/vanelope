import { useForm } from "react-hook-form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./PRDetails.css";
import { ElementToBuy, useElement } from "../../../../context/ElementContext";
import { useAuth } from "../../../../context/UserContext";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

const DetailInfoSchema = yup.object().shape({
  element: yup.string().required(),
  quantity: yup.string().required(),
  defaultUnit: yup.string().required(),
  elementType: yup.string().required(),
});

interface DetailsProps {
  elementos: ElementToBuy[];
  setElementos: (data: ElementToBuy[]) => void;
}

export const PRDetails = ({ elementos, setElementos }: DetailsProps) => {
  const { element, ElementCreator } = useElement();
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
  } = useForm<ElementToBuy>({
    resolver: yupResolver(DetailInfoSchema),
  });

  const [detalle, setDetalle] = useState<ElementToBuy>({} as ElementToBuy);

  const sender = (info: ElementToBuy) => {
    const { element } = info;

    const elemento: ElementToBuy = elementos.filter(
      (item) => item?.element === element
    )[0];

    if (!elemento) {
      ElementCreator(info);
    }

    const material = elementos.filter((item) => item.element === element);

    material.length
      ? jsNota(207.652)
      : setElementos([
          ...elementos,
          {
            ...info,
          },
        ]);
    console.log(elementos);
  };
  console.log(element);

  return (
    <div className="wrapper-dt">
      <div className="data-row">
        <div className="detail-wrapper-dt">
          <div className="individual-detail element-dt">
            {/* <BGInput
              register={register}
              name="element"
              error={errors.element?.message}
              label="Elemento"
              placeholder="Descrição do elemento"
            /> */}
            <input
              type="text"
              name="element"
              onChange={(e) =>
                setDetalle({ ...detalle, element: e.target.value })
              }
            />
          </div>
          <div className="individual-detail type-dt">
            {/* <BGInput
              register={register}
              name="elementType"
              error={errors.elementType?.message}
              label="Tipo de elemento"
              placeholder="Ferramenta, acessório"
            /> */}
            <input
              type="text"
              name="elementType"
              onChange={(e) =>
                setDetalle({ ...detalle, elementType: e.target.value })
              }
            />
          </div>
          <div className="individual-detail qty-dt">
            {/* <BGInput
              register={register}
              name="quantity"
              error={errors.quantity?.message}
              label="Quantidade"
              placeholder="moveQuantity"
            /> */}
            <input
              type="number"
              name="quantity"
              onChange={(e) =>
                setDetalle({ ...detalle, quantity: e.target.valueAsNumber })
              }
            />
          </div>
          <div className="individual-detail unit-dt">
            {/* <BGInput
              register={register}
              name="defaultUnit"
              error={errors.defaultUnit?.message}
              label="Unidade"
              placeholder="m, k, l"
            /> */}
            <input
              type="text"
              name="defaultUnit"
              onChange={(e) =>
                setDetalle({ ...detalle, defaultUnit: e.target.value })
              }
            />
          </div>
        </div>
        <div className="botonera-dt">
          <Button variant="yes" type="submit" onSubmit={handleSubmit(sender)}>
            Incluir
          </Button>
        </div>
        <div className="detail-action">
          <div
            className="detail-btn"
            role="button"
            onClick={() => sender(detalle)}
          >
            <FaPlus />
          </div>
        </div>
      </div>
      <div className="data-show">
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
      </div>
    </div>
  );
};
