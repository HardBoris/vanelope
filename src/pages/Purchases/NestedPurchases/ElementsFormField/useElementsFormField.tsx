import { useFieldArray, useFormContext } from "react-hook-form";
import { purchaseRequisitionValues } from "../../../../context/PurchaseContext";

function useElementsFormField() {
  const { control, register } = useFormContext<purchaseRequisitionValues>();

  const { fields, append, remove } = useFieldArray<purchaseRequisitionValues>({
    control,
    name: "elementsList",
  });

  const addNewElement = () => {
    append({
      element: "",
      elementType: "",
      quantity: 0,
      defaultUnit: "",
    });
  };

  const removeElement = (elementIndex: number) => () => {
    remove(elementIndex);
  };

  return {
    fields,
    register,
    addNewElement,
    removeElement,
  };
}

export default useElementsFormField;
