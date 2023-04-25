import { ReactNode } from "react";
import { toast } from "react-toastify";

export const errorToast = (textOrComponent: string | ReactNode) => {
  toast.error(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000,
    theme: "colored",
  });
};

export const successToast = (textOrComponent: string | ReactNode) => {
  toast.success(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000,
    theme: "colored",
  });
};

export const infoToast = (textOrComponent: string | ReactNode) => {
  toast.info(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000,
    theme: "colored",
  });
};
