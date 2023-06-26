import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../components/Form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { usePurchase } from "../../context/PurchaseContext";

const purchaseSchema = yup.object().shape({
  purchaseReference: yup.string().required("Campo obrigatório"),
  deliveryDate: yup.string().required("Campo obrigatório"),
  supplierId: yup.string().required("Senha obrigatória"),
  //   paymentInstallments: yup.string().required("Campo obrigatório"),
  //   logisticMode: yup.string().required(),
});

interface purchaseData {
  purchaseReference: string;
  deliveryDate: string;
  supplierId: string;
}

export const PurchaseForm = () => {
  const { Buy } = usePurchase();
  // const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<purchaseData>({ resolver: yupResolver(purchaseSchema) });

  const sender = (data: purchaseData) => {
    Buy(data);
  };

  return (
    <Formulario onSubmit={handleSubmit(sender)} isColumn={true}>
      <Input
        register={register}
        name="purchaseReference"
        error={errors.purchaseReference?.message}
        placeholder="Referência"
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
        name="supplierId"
        error={errors.supplierId?.message}
        placeholder="Fornecedor"
        isPassword={false}
      />
      <Button type="submit">Enviar</Button>
    </Formulario>
  );
};
