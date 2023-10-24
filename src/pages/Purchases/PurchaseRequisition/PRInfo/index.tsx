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
import { useFormContext, FormProvider } from "react-hook-form";
import { Container } from "../../../../components/Container";

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
      <Container>
        {/* red */}
        <div className="shoppinglist-wrapper">
          {/* blue */}
          <div className="input-purchase date">
            <BGInput
              register={register}
              name="purchaseDate"
              error={errors.purchaseDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
          {/* </div>
        <div className="shoppinglist-wrapper"> */}
          <PRDetails
            elementos={elementos}
            setElementos={setElementos}
            // purchase={thisPurchase}
            // setPurchase={setThisPurchase}
          />
        </div>
        <div className="input-purchase">
          <Button type="submit" variant="yes">
            Avançar
          </Button>
        </div>
      </Container>
    </div>
  );
};
