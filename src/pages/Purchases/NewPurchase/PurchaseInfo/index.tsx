import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./PurchaseInfo.css";
import { Formulario } from "../../../../components/Form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { PurchaseData } from "../../../../context/PurchaseContext";

const PurchaseInfoSchema = yup.object().shape({
  purchaseDate: yup.string().required(),
  fantasyName: yup.string().required(),
  CNPJ: yup.string().required(),
  paymentForm: yup.string().required(),
  paymentInstallments: yup.string().required(),
  logisticMode: yup.string().required(),
  deliveryDate: yup.string().required(),
});

interface PurchaseInfoProps {
  setThisPurchase: (data: PurchaseData) => void;
  setShow: (arg: number) => void;
}

export const PurchaseInfo = ({
  setThisPurchase,
  setShow,
}: PurchaseInfoProps) => {
  const ahora = Date.now();

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
      <Formulario clase="" onSubmit={handleSubmit(sender)}>
        <div className="input-wrapper-purchase">
          <div className="input-purchase supplier">
            <BGInput
              register={register}
              name="fantasyName"
              error={errors.fantasyName?.message}
              label="Fornecedor"
              placeholder="Nome Fantasia"
            />
          </div>
          <div className="input-purchase cnpj">
            <BGInput
              register={register}
              name="CNPJ"
              error={errors.CNPJ?.message}
              label="CNPJ"
              placeholder="CNPJ só números"
            />
          </div>
          <div className="input-purchase date">
            <BGInput
              register={register}
              name="purchaseDate"
              error={errors.purchaseDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
        </div>
        <div className="input-wrapper-purchase">
          <div className="input-purchase paymentform">
            <BGInput
              register={register}
              name="paymentForm"
              error={errors.paymentForm?.message}
              label="Forma de Pagamento"
              placeholder="Faturado, Cartão ou Dinheiro"
            />
          </div>
          <div className="input-purchase installment">
            <BGInput
              register={register}
              name="paymentInstallments"
              error={errors.paymentInstallments?.message}
              label="Parcelas"
              placeholder="Numero de parcelas e prazos"
            />
          </div>
          <div className="input-purchase logistic">
            <BGInput
              register={register}
              name="logisticMode"
              error={errors.logisticMode?.message}
              label="Logistica"
              placeholder="Entrega ou Retirada"
            />
          </div>
          <div className="input-purchase date">
            <BGInput
              register={register}
              name="deliveryDate"
              error={errors.deliveryDate?.message}
              label="Previsão de Entrega"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
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
