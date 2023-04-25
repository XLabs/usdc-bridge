import { ReactNode } from "react";
import { toast } from "react-toastify";

export const errorToast = (
  textOrComponent: string | ReactNode,
  ms?: number
) => {
  toast.error(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000 || ms,
    theme: "colored",
  });
};

export const successToast = (
  textOrComponent: string | ReactNode,
  ms?: number
) => {
  toast.success(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000 || ms,
    theme: "colored",
  });
};

export const infoToast = (textOrComponent: string | ReactNode, ms?: number) => {
  toast.info(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000 || ms,
    theme: "colored",
  });
};
