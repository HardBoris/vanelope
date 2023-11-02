import { useForm } from "react-hook-form";
import { ElementToBuy } from "../../../context/ElementContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ElementApplicationFormShape {
  listDate: string;
  elementsList: ElementToBuy[];
}

const schema = yup.object().shape({
  listDate: yup.string().required(),
  elementsList: yup
    .array()
    .of(
      yup.object({
        element: yup.string().required(),
        elementType: yup.string().required(),
        quantity: yup.number().required(),
        defaultUnit: yup.string().required(),
      })
    )
    .required(),
});

export const emptyElement: ElementToBuy = {
  element: "",
  elementType: "",
  quantity: "",
  defaultUnit: "",
};

export const useElementApplicationForm = () => {
  return useForm<ElementApplicationFormShape>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: { elementsList: [emptyElement] },
  });
};
