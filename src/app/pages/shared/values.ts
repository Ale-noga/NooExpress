import Swal from "sweetalert2";

export const Whitespace: RegExp = new RegExp("\\S");
export const numbers: RegExp = new RegExp("^[0-9]+$");
export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
