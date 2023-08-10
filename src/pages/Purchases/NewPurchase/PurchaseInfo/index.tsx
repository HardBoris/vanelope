import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./style.css";
import { Formulario } from "../../../../components/Form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { Purchase } from "../../../../context/PurchaseContext";

const PurchaseInfoSchema = yup.object().shape({
  purchaseDate: yup.string().required(),
  supplierName: yup.string().required(),
  supplierCNPJ: yup.string().required(),
  paymentForm: yup.string().required(),
  paymentInstallments: yup.string().required(),
  logisticMode: yup.string().required(),
  deliveryDate: yup.string().required(),
});

interface PurchaseInfoProps {
  setThisPurchase: (data: Purchase) => void;
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
  } = useForm<Purchase>({
    resolver: yupResolver(PurchaseInfoSchema),
  });

  const sender = (data: Purchase) => {
    setThisPurchase(data);
    setShow(1);
  };

  return (
    <div className="form-wrapper">
      <Formulario onSubmit={handleSubmit(sender)}>
        <div className="input-horizontal-wrapper">
          <div className="input-supplier">
            <BGInput
              register={register}
              name="supplierName"
              error={errors.supplier?.message}
              label="Fornecedor"
              placeholder="Nome Fantasia"
            />
          </div>
          <div className="input-cnpj">
            <BGInput
              register={register}
              name="supplierCNPJ"
              error={errors.supplier?.message}
              label="CNPJ"
              placeholder="CNPJ só números"
            />
          </div>
          <div className="input-date">
            <BGInput
              register={register}
              name="purchaseDate"
              error={errors.purchaseDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
        </div>
        <div className="input-horizontal-wrapper">
          <div className="input-paymentform">
            <BGInput
              register={register}
              name="paymentForm"
              error={errors.paymentForm?.message}
              label="Forma de Pagamento"
              placeholder="Faturado, Cartão ou Dinheiro"
            />
          </div>
          <div className="input-installment">
            <BGInput
              register={register}
              name="paymentInstallments"
              error={errors.paymentInstallments?.message}
              label="Parcelas"
              placeholder="Numero de parcelas e prazos"
            />
          </div>
          {/* </div>
        <div className="input-horizontal-wrapper"> */}
          <div className="input-logistic">
            <BGInput
              register={register}
              name="logisticMode"
              error={errors.logisticMode?.message}
              label="Logistica"
              placeholder="Entrega ou Retirada"
            />
          </div>
          <div className="input-date">
            <BGInput
              register={register}
              name="deliveryDate"
              error={errors.deliveryDate?.message}
              label="Previsão de Entrega"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
        </div>

        <Button type="submit" variant="yes">
          Avançar
        </Button>
      </Formulario>
    </div>
  );
};
