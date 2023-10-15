import { purchaseRequisitionValues } from "../../../context/PurchaseContext";
import { useForm } from "react-hook-form";

function useElementsForm() {
  const ahora = Date.now();
  const methods = useForm<purchaseRequisitionValues>({
    defaultValues: {
      listDate: new Date(ahora).toLocaleDateString(),
      elementsList: [],
    },
  });

  const handleSubmit = (values: purchaseRequisitionValues) => {
    console.log(values);
  };

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
}

export default useElementsForm;
