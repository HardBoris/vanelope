import { useForm } from "react-hook-form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./PRDetails.css";
import { ElementToBuy, useElement } from "../../../../context/ElementContext";
import { useAuth } from "../../../../context/UserContext";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Formulario } from "../../../../components/Form";
import {
  PRequest,
  usePR,
} from "../../../../context/PurchaseRequisitionContext";

const DetailInfoSchema = yup.object().shape({
  element: yup.string().required(),
  quantity: yup.string().required(),
  defaultUnit: yup.string().required(),
  elementType: yup.string().required(),
  // listDate: yup.string().required(),
});

interface DetailsProps {
  elementos: ElementToBuy[];
  setElementos: (data: ElementToBuy[]) => void;
}

export const PRDetails = ({ elementos, setElementos }: DetailsProps) => {
  const { element, ElementCreator, stock, ElementsList } = useElement();
  const context = new AudioContext();

  /* useEffect(() => {
    ElementsList();
  }); */

  const ahora = Date.now();

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
    formState,
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<ElementToBuy>({
    resolver: yupResolver(DetailInfoSchema),
  });

  /* const onSubmit = (data: ElementToBuy, e: React.BaseSyntheticEvent) => {
    e.target.reset();
  }; */

  const [detalle, setDetalle] = useState<ElementToBuy>({} as ElementToBuy);

  const sender = (info: ElementToBuy) => {
    const { element } = info;

    /* const elemento: ElementToBuy = elementos.filter(
      (item) => item?.element === element
    )[0]; */

    const existe = stock.filter((item) => item.element === element)[0];

    if (!existe) {
      ElementCreator(info);
    }

    const material: ElementToBuy = elementos.filter(
      (item) => item.element === element
    )[0];

    material
      ? jsNota(207.652)
      : setElementos([
          ...elementos,
          {
            ...info,
          },
        ]);

    /* !material &&
      setElementos([
        ...elementos,
        {
          ...info,
          elementId: existe?.elementId,
        },
      ]); */
    console.log(stock);
    console.log(existe);
  };
  // console.log(element);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        element: "",
        elementType: "",
        quantity: 0,
        defaultUnit: "",
      });
    }
  }, [formState, reset]);

  return (
    // green
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
        <div className="data-row">
          <div className="detail-wrapper-dt">
            <div className="individual-detail element-dt">
              <BGInput
                register={register}
                name="element"
                error={errors.element?.message}
                label="Elemento"
                placeholder="Descrição do elemento"
              />
            </div>
            <div className="individual-detail type-dt">
              <BGInput
                register={register}
                name="elementType"
                error={errors.elementType?.message}
                label="Tipo de elemento"
                placeholder="Ferramenta, acessório"
              />
            </div>
            <div className="individual-detail qty-dt">
              <BGInput
                register={register}
                name="quantity"
                error={errors.quantity?.message}
                label="Quantidade"
                placeholder="moveQuantity"
              />
            </div>
            <div className="individual-detail unit-dt">
              <BGInput
                register={register}
                name="defaultUnit"
                error={errors.defaultUnit?.message}
                label="Unidade"
                placeholder="m, k, l"
              />
            </div>
          </div>
          <div className="botonera-dt">
            <Button variant="yes" type="submit">
              Incluir
            </Button>
          </div>
          <div className="detail-action">
            <button className="detail-btn" type="submit">
              <FaPlus />
            </button>
          </div>
        </div>
      </Formulario>
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
                  onClick={() => elementos.splice(index, 1)}
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
