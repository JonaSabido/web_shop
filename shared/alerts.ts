import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export const Confirm = Swal.mixin({
  customClass: {
    title: 'artegra',
    confirmButton: 'btn btn-delete',
    cancelButton: 'btn btn-edit '
  },
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true
});

export const ConfirmSale = Swal.mixin({
  customClass: {
    title: 'artegra',
    confirmButton: 'btn btn-add ',
    cancelButton: 'btn btn-delete '
  },
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true
});


export const SwalAlert = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-light-danger'
  },
  buttonsStyling: false
});