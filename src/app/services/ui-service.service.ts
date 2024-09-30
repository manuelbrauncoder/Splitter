import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  showToast = false;
  toastMessage = '';

  setOpen(isOpen: boolean, message?: string) {
    if (message) {
      this.toastMessage = message;
    }
    this.showToast = isOpen;
  }

  constructor() { }
}
