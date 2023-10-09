import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../components/Form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { usePurchase } from "../../context/PurchaseContext";
import { useState } from "react";

const purchaseDetailsSchema = yup.object().shape({
  element: yup.string().required("Campo obrigatório"),
  quantity: yup.string().required("Campo obrigatório"),
  unit: yup.string().notRequired(),
  cost: yup.string().notRequired(),
});

interface purchaseDetailsData {
  element: string;
  quantity: string;
  unit: string;
  cost: string;
}

interface purchaseDetailsFormProps {
  commutador: () => void;
  detalles: () => void;
}

export const PurchaseDetailsForm = () => {
  const [listaDeCompras, setListaDeCompras] = useState<purchaseDetailsData[]>(
    []
  );

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<purchaseDetailsData>({
    resolver: yupResolver(purchaseDetailsSchema),
  });

  const sender = (data: purchaseDetailsData) => {
    console.log(data);
    setListaDeCompras(listaDeCompras && [...listaDeCompras, data]);
    console.log(listaDeCompras);
  };

  return (
    <Formulario clase="" onSubmit={handleSubmit(sender)}>
      <div className="datos">
        <Input
          register={register}
          name="element"
          error={errors.element?.message}
          label="Elemento"
          isPassword={false}
        />
        <Input
          register={register}
          name="quantity"
          error={errors.quantity?.message}
          label="Cantidad"
          isPassword={false}
        />
        <Input
          register={register}
          name="unit"
          error={errors.unit?.message}
          label="Unidad"
          isPassword={false}
        />
        <Input
          register={register}
          name="cost"
          error={errors.cost?.message}
          label="Precio"
          isPassword={false}
        />
        <div className="accion">
          <Button type="submit">+</Button>
        </div>
      </div>
    </Formulario>
  );
};
