import { ReactNode } from "react";
import { toast } from "react-toastify";

export const errorToast = (
  textOrComponent: string | ReactNode,
  ms?: number,
  id?: string
) => {
  toast.error(textOrComponent, {
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: ms ? ms : 6000,
    theme: "colored",
    toastId: id ? id : undefined,
  });
};

export const successToast = (
  textOrComponent: string | ReactNode,
  ms?: number,
  id?: string
) => {
  toast.success(textOrComponent, {
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: ms ? ms : 6000,
    theme: "colored",
    toastId: id ? id : undefined,
  });
};

export const infoToast = (
  textOrComponent: string | ReactNode,
  ms?: number,
  id?: string
) => {
  toast.info(textOrComponent, {
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: ms ? ms : 6000,
    theme: "colored",
    toastId: id ? id : undefined,
  });
};
