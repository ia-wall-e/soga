import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
/* */
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateRootComponent } from '../components/create-root/create-root.component';
import { RootManagerComponent } from '../components/root-manager/root-manager.component';
// import { NewCategoryComponent } from '../components/new-category/new-category.component';
// import { CategoriesOverviewComponent } from '../components/categories-overview/categories-overview.component';
// import { NewSubcategoryComponent } from '../components/new-subcategory/new-subcategory.component';
// import { CategoryDetailsComponent } from '../components/category-details/category-details.component';
// import { ChildrenDetailsComponent } from '../components/children-details/children-details.component';
// import { EditCategoryComponent } from '../components/edit-category/edit-category.component';
// import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
/* */
import {take } from 'rxjs';
import { INavigationData } from '../utils/category-interface';
import { CreateNodeComponent } from '../components/create-node/create-node.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements  OnDestroy,AfterViewInit {
  @ViewChild('containerComponents', { read: ViewContainerRef }) boxComponents!: ViewContainerRef;
  onStage?: any;
  categoryData?: any;
  navHistory: INavigationData[] = [];
  currentIndex = -1;
  //#region app-components y navigation(buttons -id)
  public appPage? = [
    { label: 'Dashboard', component_id: 'dashboard', type: 'parent', icon: 'grid', visible: true, },
    // { label: 'Categorias', component_id: 'overview', type: 'parent', icon: 'bookmarks', visible: false, },
    { label: 'Crear categoria', component_id: 'createRoot', type: 'parent', icon: 'add-circle', visible: true },
    { label: 'Detalles categoria', component_id: 'rootManager', type: 'child', icon: 'add-circle', visible: false },
    // { label: 'Detalles subcategoria', component_id: 'nodeDetails', type: 'child', icon: 'add-circle', visible: false },
    { label: 'Crear Subcategoria', component_id: 'createNode', type: 'child', icon: 'add-circle', visible: false },
    // { label: 'Editar Categoria', component_id: 'editCategory', type: 'child', icon: 'hammer', visible: false },
  ];
  // get btnApps(): { label: string; component_id: string, type: string, icon: string; visible: boolean; }[] {
  //   return this.appPage ? this.appPage.filter(item => item.visible) : [];
  // }
  //#endregion
  constructor() { }
  //#region Hook
  ngAfterViewInit(): void {
    this.initializeComponent({componentID:'dashboard'})
  }
  ngOnDestroy() { }
  //#endregion
  //#region Componentes dinamicos
  initializeComponent(component: INavigationData) {
    this.onNavigation(component)
  }
  onNavigation(navData: INavigationData) {
    try {
      // 1. Buscar el nuevo componente
      const component = this.getComponentById(navData.componentID);
      // console.log(component)
      if (!component) {
        console.error(`No se encontró el componente para ID: ${navData.componentID}`);
        throw new Error('No se encontró el componente para ID');
      }
      // console.log('non-stop')
      // 2. Destruir el componente actual si existe
      this.onStage?.destroy();
      // 3. Crear nuevo componente
      this.onStage = this.boxComponents.createComponent(component);
      // 4. Pasar datos al componente creado (como si fuera un @Input)
      if (this.onStage.instance) {
        this.onStage.instance.categoryData = navData.data || {};
      }
      // 5. Escuchar el EventEmitter 'navigationDatar' solo si existe
      if (this.onStage.instance?.navigationData) {
        this.onStage.instance.navigationData.pipe(take(1)).subscribe((r: INavigationData) => {
          // console.log('Datos recibidos desde componente hijo:', r);
          this.navigationHistory(r)
          this.onNavigation(r)
        });
      } else {
        console.warn('El componente creado no tiene "navigationData"');
      }
    } catch (e) { }
  }
  getComponentById(component_id: string) {
    const map = new Map<string, any>([
      ['dashboard', DashboardComponent],
      // ['overview', CategoriesOverviewComponent],
      ['createRoot', CreateRootComponent],
      ['createNode', CreateNodeComponent],
      ['rootManager', RootManagerComponent],
      // ['nodeDetails', ChildrenDetailsComponent],
      // ['edit', EditCategoryComponent],
    ]);
    return map.get(component_id);
  }
  navigationHistory(navData:INavigationData) {
    // const parent = this.appPage?.some(item => item.component_id == navData.componentID && item.type === 'parent');
    // const indice = this.navHistory.findIndex(obj => obj.componentID == navData.componentID);
    // if (parent) {
    //   this.navHistory.length = 0;
    //   this.currentIndex = -1;
    // }
    // if (indice <= 0) {
    //   this.navHistory.push(navData);
    //   this.currentIndex++;
    // } else {
    //   this.navHistory = this.navHistory.slice(0, indice + 1);
    // }
    // // console.log('currentIndice :'+this.currentIndex)
    // // console.log('indice: '+indice)
    // console.log(this.navHistory)
  }
  //#endregion
}
/** * QUERY COUCHDB
   //#region example creacion query
  createDesign() {
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
          "map": "function(doc){ if(doc.type === 'category' && doc.parent_id)emit(doc.parent_id, doc)}"
        }
      },
    }
    this.categorySvc.createQuery(query)
  }
  // //doc.metadata.lastUpdate.date,{id:doc._id,label:doc.label,icon:doc.icon,status:doc.status,nodes:doc.nodes,update:{type:doc.metadata.update.type,user:doc.metadata.update.user,date:doc.metadata.update.date}}
  //#endregion
 */
