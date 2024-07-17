import Swal from 'sweetalert2';

export const alertSuccess = (msg) => {
  Swal.fire({
    title: 'Success',
    text: msg,
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
  });
};

export const alertError = (msg) => {
  Swal.fire({
    title: 'Error',
    text: msg,
    icon: 'error',
    timer: 2000,
    timerProgressBar: true,
  });
};

export const alertWarning = (msg) => {
  Swal.fire({
    title: 'Warning',
    text: msg,
    icon: 'warning',
    timer: 2000,
    timerProgressBar: true,
  });
};
