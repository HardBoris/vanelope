import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./PRInfo.css";
import { Formulario } from "../../../../components/Form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { PurchaseData, elementData } from "../../../../context/PurchaseContext";
import { PRDetails } from "../PRDetails";
import { useEffect, useState } from "react";
import { ElementToBuy } from "../../../../context/ElementContext";
import { useFormContext, FormProvider } from "react-hook-form";
import { Container } from "../../../../components/Container";
import {
  PRequest,
  usePR,
} from "../../../../context/PurchaseRequisitionContext";

/* const PrequestInfoSchema = yup.object().shape({
  listDate: yup.string().required(),
}); */

/* interface PurchaseInfoProps {
  setThisPrequest: (data: PRequest) => void;
  setShow: (arg: number) => void;
} */

export const PRInfo = () => {
  const { prequestCreator } = usePR();

  const ahora = Date.now();
  const [elementos, setElementos] = useState<ElementToBuy[]>([]);
  const [thisPrequest, setThisPrequest] = useState<PRequest>({} as PRequest);

  /* const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PurchaseData>({
    resolver: yupResolver(PurchaseInfoSchema),
  }); */

  // let data: PRequest = {} as PRequest;

  const sender = () => {
    const data = {
      listDate: new Date(ahora).toLocaleDateString("pt"),
      details: elementos,
    };
    prequestCreator(data);
    // setShow(1);
    // console.log(thisPrequest);
  };

  /* useEffect(() => {
    setThisPrequest(data);
  }, []); */

  return (
    <div className="form-wrapper-purchase">
      <Container>
        {/* red */}
        <div className="shoppinglist-wrapper">
          {/* blue */}
          <div className="input-purchase date">
            {/* <BGInput
              register={register}
              name="purchaseDate"
              error={errors.purchaseDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            /> */}
            {new Date(ahora).toLocaleDateString("pt")}
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
          <Button type="button" variant="yes" onClick={() => sender()}>
            Avançar
          </Button>
        </div>
      </Container>
    </div>
  );
};
