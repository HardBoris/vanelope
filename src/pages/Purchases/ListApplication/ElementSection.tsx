import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BGInput } from "../../../components/BG Input";
import {
  ElementApplicationFormShape,
  emptyElement,
} from "./ElementApplicationForm";

export interface Props {
  form: UseFormReturn<ElementApplicationFormShape, any>;
}

export const ElementSection = ({
  form: {
    control,
    register,
    formState: { errors },
  },
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "elementsList",
  });

  return (
    <div className="form-section">
      {fields.map((field, index) => (
        <div key={index}>
          <div className="input-purchase date">
            <BGInput
              register={register}
              name={`elementsList.${index}.element`}
              label="Elemento"
              error={errors.elementsList?.[index]?.element?.message}
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={() => append(emptyElement)}>
        plus
      </button>
    </div>
  );
};
