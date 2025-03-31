import { Injectable } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loadingCtrl:LoadingController,private toastCtrl: ToastController) { }
  async loadingPresent(){
    const loading = await this.loadingCtrl.create({
      message: 'Por favor, espere...',
    });
    await loading.present();
  }
  /** */
  async toastPresent(mensaje: string, duracion: number = 2000) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: 'bottom', // 'top', 'middle', 'bottom'
    });
    await toast.present();
  }
}
