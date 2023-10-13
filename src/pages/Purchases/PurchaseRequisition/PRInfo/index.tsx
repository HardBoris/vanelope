import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./PRInfo.css";
import { Formulario } from "../../../../components/Form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { PurchaseData, elementData } from "../../../../context/PurchaseContext";
import { PRDetails } from "../PRDetails";
import { useState } from "react";
import { ElementToBuy } from "../../../../context/ElementContext";

const PurchaseInfoSchema = yup.object().shape({
  purchaseDate: yup.string().required(),
  // fantasyName: yup.string().required(),
  // CNPJ: yup.string().required(),
  // paymentForm: yup.string().required(),
  // paymentInstallments: yup.string().required(),
  // logisticMode: yup.string().required(),
  // deliveryDate: yup.string().required(),
});

interface PurchaseInfoProps {
  setThisPurchase: (data: PurchaseData) => void;
  setShow: (arg: number) => void;
}

export const PRInfo = ({ setShow }: PurchaseInfoProps) => {
  const ahora = Date.now();
  const [elementos, setElementos] = useState<ElementToBuy[]>([]);
  const [thisPurchase, setThisPurchase] = useState<PurchaseData>(
    {} as PurchaseData
  );

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PurchaseData>({
    resolver: yupResolver(PurchaseInfoSchema),
  });

  const sender = (data: PurchaseData) => {
    setThisPurchase(data);
    setShow(1);
  };

  return (
    <div className="form-wrapper-purchase">
      <Formulario onSubmit={handleSubmit(sender)}>
        <div className="shoppinglist-wrapper">
          <div className="input-purchase date">
            <BGInput
              register={register}
              name="purchaseDate"
              error={errors.purchaseDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
          {/*  </div>
        <div className="shoppinglist-wrapper"> */}
          <PRDetails
            elementos={elementos}
            setElementos={setElementos}
            // purchase={thisPurchase}
            // setPurchase={setThisPurchase}
          />
          {/* <div className="input-purchase paymentform">
            <BGInput
              register={register}
              name="paymentForm"
              error={errors.paymentForm?.message}
              label="Forma de Pagamento"
              placeholder="Faturado, Cartão ou Dinheiro"
            />
          </div> */}
          {/* <div className="input-purchase installment">
            <BGInput
              register={register}
              name="paymentInstallments"
              error={errors.paymentInstallments?.message}
              label="Parcelas"
              placeholder="Numero de parcelas e prazos"
            />
          </div> */}
          {/* <div className="input-purchase logistic">
            <BGInput
              register={register}
              name="logisticMode"
              error={errors.logisticMode?.message}
              label="Logistica"
              placeholder="Entrega ou Retirada"
            />
          </div> */}
          {/* <div className="input-purchase date">
            <BGInput
              register={register}
              name="deliveryDate"
              error={errors.deliveryDate?.message}
              label="Previsão de Entrega"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div> */}
        </div>

        <div className="input-purchase">
          <Button type="submit" variant="yes">
            Avançar
          </Button>
        </div>
      </Formulario>
    </div>
  );
};
