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
  private navigation = new BehaviorSubject<NavigationData>({id:null,data:undefined});
  navigation$ = this.navigation.asObservable();
  constructor() { }
  //#
  navigateTo(id:any,data?:any) {
    console.log(id)
    console.log(data)
    this.navigation.next({id,data})
  }
  getCurrentNavigation(): any {
    return this.navigation.getValue();
  }
}

/*** 
NAVIGATION SERVICE:
 se usa para la nevegacion y el envio de datos entre la carga dinamica de componentes (ngComponentsOutlet). El servicio es generico
 ***/