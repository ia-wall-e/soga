import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
/* */
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NodeManagerComponent } from '../components/node-manager/node-manager.component';
import { CreateNodeComponent } from '../components/create-node/create-node.component';
/* */
import { take } from 'rxjs';
import { INavigationData } from '../utils/category-interface';
import { EditNodeComponent } from '../components/edit-node/edit-node.component';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { ICategoryModel } from 'src/app/core/interface/category-model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements AfterViewInit {
  @ViewChild('containerComponents', { read: ViewContainerRef }) boxComponents!: ViewContainerRef;
  onStage?: any;
  navHistory: INavigationData[] = [];
  currentIndex = -1;
  public appPage? = [
    { label: 'Dashboard', component_id: 'dashboard', type: 'parent', icon: 'grid', visible: true, },
    { label: 'Detalles Generico', component_id: 'nodeManager', type: 'child', icon: 'add-circle', visible: false },
    { label: 'Crear Subcategoria', component_id: 'createNode', type: 'child', icon: 'add-circle', visible: false },
    { label: 'Editar Categoria', component_id: 'editNode', type: 'child', icon: 'add-circle', visible: false },
  ];
  constructor(private categorySvc: CategoriesProductsService) { }
  //#region - Hook
  ngAfterViewInit(): void {
    this.initializeComponent({ componentID: 'dashboard' }, this.navHistory)
  }
  //#endregion
  //#region - Componentes dinamicos (navigaton -  history)
  onNavigation(navData: INavigationData) {
    this.navigationManager(navData, this.navHistory)
  }
  private initializeComponent(navData: INavigationData, navHistory:any) {
    this.navigationManager(navData, navHistory)
  }
  private navigationManager(navData: INavigationData, navHistory:any) {
    try {
      // 1. Buscar el nuevo componente
      const component = this.getComponentById(navData.componentID);
      if (!component) {
        // throw new Error(`No se encontró el componente para ID: ${navData.componentID}`);
        console.warn(`No se encontró el componente para ID: ${navData.componentID}`);
      }
      // 2. Destruir el componente actual si existe
      this.onStage?.destroy();
      // 3. Crear nuevo componente
      this.onStage = this.boxComponents.createComponent(component);
      // 4. Agregar al historial de navegacion
      // console.log(navData);
      this.navigationHistory(navData, navHistory);
      // 5. Pasar datos al componente creado (como si fuera un @Input)
      if (this.onStage.instance) {
        this.onStage.instance.navigationData = navData || null;
        //  this.onStage.instance.navigationData = navData || null;
      }
      // 6. Escuchar el EventEmitter 'navigationDatar' solo si existe
      if (this.onStage.instance?.navigationDataComponent) {
        this.onStage.instance.navigationDataComponent.pipe(take(1)).subscribe((r: INavigationData) => {
          // console.log(r)
          this.navigationManager(r, navHistory);
        });
      } else {
        console.warn('El componente creado no tiene "navigationDataComponent"');
      }
    } catch (e) {
      console.error(`ERROR: ${e}}`);
    }
  }
  private navigationHistory(navData: INavigationData, navHistory:any) {
    if(!navData) throw new Error('Se presento un problema en el historial de navegación');
    const categoryData  = navData.categoryData;
    const parent = this.appPage?.some(item => item.component_id == navData.componentID && item.type === 'parent');
    const indice = navHistory.findIndex((obj:INavigationData) => obj.categoryData?._id == categoryData?._id);
    console.log("Indice: "+ indice);
    // console.log(navData);
    if (!parent && indice == -1) {
      navHistory.push(navData);
    } else {
      navHistory = navHistory.slice(0, indice + 1);
    }
    // console.log('currentIndice :'+this.currentIndex)
    // console.log('indice Final: '+ indice)
    // console.log(this.navHistory)
    return navHistory
  }
  private getComponentById(component_id: string) {
    const map = new Map<string, any>([
      ['dashboard', DashboardComponent],
      ['createNode', CreateNodeComponent],
      ['nodeManager', NodeManagerComponent],
      ['editNode', EditNodeComponent],
    ]);
    return map.get(component_id);
  }
  //#endregion
  //#region - View
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

  //#endregion
}