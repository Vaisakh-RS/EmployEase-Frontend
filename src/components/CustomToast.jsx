import React from 'react';
import { toast } from 'react-toastify';

export const showCustomToast = (message, type) => {
  toast(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    type: type,
  });
};

export const CustomToastSuccess = (message) => {
  return showCustomToast(message, 'success');
};

export const CustomToastError = (message) => {
  return showCustomToast(message, 'error');
};

export const CustomToastInfo = (message) => {
  return showCustomToast(message, 'info');
};

export const CustomToastWarning = (message) => {
  return showCustomToast(message, 'warning');
};
