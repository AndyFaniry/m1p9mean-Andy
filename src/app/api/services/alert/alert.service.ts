import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public val: boolean = false;
  constructor() { }
  public async confirmation(icon,titre,content){
    var val = Swal.fire({
      title: titre,
      text: content,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#06768b',
      cancelButtonColor: 'red',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    });
    return val;
  }

  public success(titre){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: titre,
      showConfirmButton: false,
      timer: 2000
      }).then(()=>{  
      });
  }
  public error(titre){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: titre,
      showConfirmButton: false,
      timer: 2000
      }).then(()=>{  
      });
  }
}
