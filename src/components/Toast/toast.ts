import { Id, toast } from "react-toastify";

export const SuccessToast = (message: any) => {
  setTimeout(() => {
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, 700);
};

export const ErrorToast = (message: any) => {
  setTimeout(() => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, 700);
};

export const LoadingToast = (message?: any) => {
  const loading = toast.loading(message);

  return loading;
};

export const DissmissToast = () => {
  const { loading } = LoadingToast();

  toast.dismiss(loading);
};
