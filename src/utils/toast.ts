import { ReactNode } from "react";
import { toast } from "react-toastify";

export const errorToast = (textOrComponent: string | ReactNode, ms?: number) => {
  toast.error(textOrComponent, {
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: ms ? ms : 6000,
    theme: "colored",
  });
};

export const successToast = (textOrComponent: string | ReactNode, ms?: number) => {
  toast.success(textOrComponent, {
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: ms ? ms : 6000,
    theme: "colored",
  });
};

export const infoToast = (textOrComponent: string | ReactNode, ms?: number) => {
  toast.info(textOrComponent, {
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: ms ? ms : 6000,
    theme: "colored",
  });
};
