/* import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../components/Form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { usePurchase } from "../../context/PurchaseContext";
import { Select } from "../../components/Select";

const purchaseSchema = yup.object().shape({
  purchaseReference: yup.string().required("Campo obrigatório"),
  deliveryDate: yup.string().required("Campo obrigatório"),
  logisticMode: yup.string().notRequired(),
  paymentForm: yup.string().notRequired(),
  paymentInstallments: yup.string().notRequired(),
  purchaseStatus: yup.string().notRequired(),
  supplierId: yup.string().required("Senha obrigatória"),
});

interface purchaseData {
  purchaseReference: string;
  deliveryDate: string;
  logisticMode: string;
  paymentForm: string;
  paymentInstallments: string;
  purchaseStatus: string;
  supplierId: string;
}

interface purchaseFormProps {
  commutador: () => void;
  detalles: () => void;
}

export const PurchaseForm =
  ( { commutador, detalles }: purchaseFormProps ) => {
    const { Buy } = usePurchase();

    const lista = [
      "primera",
      "segunda",
      "tercera",
      "e9b60f59-1b78-4efd-8322-94f0bc7d6f84",
    ];

    const {
      formState: { errors },
      register,
      handleSubmit,
    } = useForm<purchaseData>({ resolver: yupResolver(purchaseSchema) });

    const sender = (data: purchaseData) => {
      Buy(data);
    };

    return (
      <Formulario onSubmit={handleSubmit(sender)}>
        <div className="gavetero">
          <div className="gaveta">
            <Input
              register={register}
              name="purchaseReference"
              error={errors.purchaseReference?.message}
              placeholder="Nota Fiscal"
              isPassword={false}
            />
            <Input
              register={register}
              name="deliveryDate"
              error={errors.deliveryDate?.message}
              placeholder="Data de Entrega"
              isPassword={false}
            />
            <Input
              register={register}
              name="logisticMode"
              error={errors.logisticMode?.message}
              placeholder="Logistica"
              isPassword={false}
            />
            <Input
              register={register}
              name="paymentForm"
              error={errors.paymentForm?.message}
              placeholder="Forma de Pagamento"
              isPassword={false}
            />
          </div>
          <div className="gaveta">
            <Input
              register={register}
              name="paymentInstallments"
              error={errors.paymentInstallments?.message}
              placeholder="Parcelas"
              isPassword={false}
            />
            <Input
              register={register}
              name="purchaseStatus"
              error={errors.purchaseStatus?.message}
              placeholder="Status"
              isPassword={false}
            />
            <Select
              register={register}
              name="supplierId"
              error={errors.supplierId?.message}
              options={lista}
            />
            <div role="button">Elementos</div>
          </div>
        </div>

        <Button type="submit">Enviar</Button>
      </Formulario>
    );
  };
 */

export {};
