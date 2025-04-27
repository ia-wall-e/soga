import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface NavigationData<T = any> {
  id: any; // Tipo del componente (puede ser una clase o un identificador)
  data?: T;       // Datos asociados (opcional, genérico)
}
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigation = new BehaviorSubject<NavigationData>({ id: null, data: undefined });
  navigation$ = this.navigation.asObservable();
  private navHistory=new BehaviorSubject<any>(null);
  navHistory$=this.navHistory.asObservable();
  constructor() { }
  navigateTo(id:string, data? : any | null) {
    try {
      this.navigation.next({id,data});
    } catch (error) {
      console.error("Se presento un error en la navegacion:", error);
    }


  }
  getCurrentNavigation(): any {
    return this.navigation.getValue();
  }
}

/*** 
NAVIGATION SERVICE:
* se usa para la nevegacion y el envio de datos entre la carga dinamica de componentes (ngComponentsOutlet). El servicio es generico
* se usa para manerjar el historial interno de la carga dinamica y evitar el uso de routerlink para el proposito de manejar la navejacion internmente 
 ***/