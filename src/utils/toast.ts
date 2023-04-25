import { toast } from "react-toastify";

export const errorToast = (text: string) => {
  toast.error(text, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000,
    theme: "colored",
  });
};

export const successToast = (text: string) => {
  toast.success(text, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 6000,
    theme: "colored",
  });
};
