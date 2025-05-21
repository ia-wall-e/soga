import { AfterViewInit,OnInit, Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
/* */
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NodeManagerComponent } from '../components/node-manager/node-manager.component';
import { CreateNodeComponent } from '../components/create-node/create-node.component';
/* */
import { take } from 'rxjs';
import { INavigationData } from '../utils/category-interface';
// import { EditNodeComponent } from '../components/edit-node/edit-node.component';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone:false,
})
export class CategoriesPage implements OnInit, AfterViewInit {
  @ViewChild('containerComponents', { read: ViewContainerRef })
  private container!: ViewContainerRef;
  private componentMap = new Map<string, any>([
    ['dashboard', DashboardComponent],
    ['nodeManager', NodeManagerComponent],
    ['createNode', CreateNodeComponent],
    // ['editNode', EditNodeComponent],
  ]);
  // Estado de la navegación
  private currentComponentRef?: ComponentRef<any>;
  public navHistory: INavigationData[] = [];
  public appPage = [
    { label: 'Panel', componentId: 'dashboard', type: 'parent', icon: 'grid', visible: true },
    { label: 'Detalles Genérico', componentId: 'nodeManager', type: 'child', icon: 'add-circle', visible: false },
    { label: 'Crear Subcategoría', componentId: 'createNode', type: 'child', icon: 'add-circle', visible: false },
    { label: 'Editar Categoría', componentId: 'editNode', type: 'child', icon: 'add-circle', visible: false },
  ];
  constructor(private categorySvc: CategoriesProductsService) { }
  ngOnInit(): void {
    // Inicializamos el historial y cualquier otro dato
    this.navHistory = [];
  }
  ngAfterViewInit(): void {
    // Cargamos el dashboard en la vista
    this.loadComponent({ componentID: 'dashboard' });
  }
 /** Carga dinámicamente un componente según su ID */
  private loadComponent(navData: INavigationData): void {
    const compType = this.componentMap.get(navData.componentID);
    if (!compType) {
      console.warn(`No existe componente con ID ${navData.componentID}`);
      return;
    }

    // 1. Destruye el anterior
    this.currentComponentRef?.destroy();

    // 2. Crea el nuevo
    this.currentComponentRef = this.container.createComponent(compType);

    // 3. Actualiza historial
    this.updateHistory(navData);

    // 4. Pasa datos al componente hijo
    this.currentComponentRef.instance.navigationData = navData;

    // 5. Suscribe al EventEmitter si existe
    const emitter = this.currentComponentRef.instance.responseComponent;
    if (emitter) {
      emitter.pipe(take(1)).subscribe((nextNav: INavigationData) => {
        this.loadComponent(nextNav);
      });
    } else {
      console.warn(`El componente ${navData.componentID} no expone responseComponent`);
    }
  }
  /** Recibe eventos de los subcomponentes */
  public onNavigation(navData: INavigationData): void {
    this.loadComponent(navData);
  }
  /** Añade o recorta el historial según el tipo de nave­gación */
  private updateHistory(navData: INavigationData): void {
    const isParent = this.appPage.some(
      p => p.componentId === navData.componentID && p.type === 'parent'
    );
    const id = navData.categoryData?._id;
    const existingIdx = this.navHistory.findIndex(h => h.categoryData?._id === id);

    if (isParent) {
      // reinicio completo
      this.navHistory = [];
    } else if (existingIdx >= 0) {
      // retrocede al punto existente
      this.navHistory = this.navHistory.slice(0, existingIdx + 1);
    } else {
      this.navHistory.push(navData);
    }
  }
   /** Creacion de las views - design para couchDB */
  createView() {
    const query = {
      "_id": "_design/categorias",
      "lenguage": "javascript",
      "views": {
        "overview": {
          "map": "function(doc) { if(doc.level === 1) emit(doc._id, doc) }",
        },
        "info": {
          "map": "function(doc){  if (doc.type === 'category') {var parentKey = doc.level === 1 ? doc._id : doc.parent_id; emit([parentKey, doc._id], doc);}}"
        },
        "nodos": {
        "map": "function(doc){ if(doc.type === 'category' && doc.parentID)emit(doc.parentID, doc)}"   
        }
      },
    }
    this.categorySvc.createView(query);
  }
}