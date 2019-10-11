// Fake toast , using Sweet Alert 2
import Swal from "sweetalert2";

export default Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});