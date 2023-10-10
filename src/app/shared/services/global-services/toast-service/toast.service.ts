import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private readonly toastController: ToastController
  ) { }

  async catchError(error: any) {
    if(error.error?.message) {
      const toast = await this.toastController.create({
        message: error.error?.message,
        duration: 2500
      })
      
      toast.present()
    }
  }
}
