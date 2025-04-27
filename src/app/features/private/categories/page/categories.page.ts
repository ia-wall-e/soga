import { Component, Injector,Provider, OnDestroy, OnInit } from '@angular/core';
/** */
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NewCategoryComponent } from '../components/new-category/new-category.component';
import { CategoriesOverviewComponent } from '../components/categories-overview/categories-overview.component';
import { NewSubcategoryComponent } from '../components/new-subcategory/new-subcategory.component';
import { CategoryDetailsComponent } from '../components/category-details/category-details.component';
import { ChildrenDetailsComponent } from '../components/children-details/children-details.component';
import { EditCategoryComponent } from '../components/edit-category/edit-category.component';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { NavigationData, NavigationService } from 'src/app/shared/utils/services/navigation.service';
import { Subscription } from 'rxjs';
import { ICategoryData } from '../utils/category-interface';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit, OnDestroy {
  public folder!: string;
  private navigationSubs!: Subscription;
  injectorCustom?:Injector;
  currentComponent: any = DashboardComponent;
  currentData?:any;
  currentNav?: string;
  navHistory: any[] = [];
  currentIndex = -1;
  //#region app-components y navigation(buttons -id)
  public appPage? = [
    { label: 'Dashboard', id_nav: 'dashboard', node: 'parent', icon: 'grid', visible: true, },
    { label: 'Categorias', id_nav: 'overview', node: 'parent', icon: 'bookmarks', visible: false, },
    { label: 'Crear categoria', id_nav: 'newCategory', node: 'child', icon: 'add-circle', visible: false },
    { label: 'Detalles categoria', id_nav: 'categoryDetails', node: 'child', icon: 'add-circle', visible: false },
    { label: 'Detalles subcategoria', id_nav: 'nodeDetails', node: 'child', icon: 'add-circle', visible: false },
    { label: 'Agregar nodo', id_nav: 'newSubcategory', node: 'child', icon: 'add-circle', visible: false },
    { label: 'Editar Categoria', id_nav: 'editCategory', node: 'child', icon: 'hammer', visible: false },
  ];
  get btnApps(): { label: string; id_nav: string, node: string, icon: string; visible: boolean; }[] {
    return this.appPage ? this.appPage.filter(item => item.visible) : [];
  }

  //#endregion
  constructor(private myInjector: Injector,private categorySvc: CategoriesProductsService, private navigationSvc: NavigationService) { }
  //#region Hook
  ngOnInit() {
    this.initializeComponent();
    this.navigationSubs = this.navigationSvc.navigation$.subscribe(
      (navData) => {
        // console.log(navData)
        this.switchComponents(navData.id);
        this.navigationHistory(navData.id, navData.data)
      }
    );
  }
  ngOnDestroy() {
    this.navigationSubs.unsubscribe();
  }
  //#endregion
  //#region Componentes dinamicos
  initializeComponent() {
    this.onLoadComponent('dashboard')
  }
  onLoadComponent(id: string, data?: ICategoryData | null) {
    // console.log(data)
    this.navigationSvc.navigateTo(id, data);
    this.injectorCustom= Injector.create({
      providers:[{provide:'componentData',useValue:{name:"Hugo"}}],
      parent:this.myInjector
    })
  }
  switchComponents(id_nav: any) {
    switch (id_nav) {
      case "dashboard": this.currentComponent = DashboardComponent; break
      case "overview": this.currentComponent = CategoriesOverviewComponent; break
      case "newCategory": this.currentComponent = NewCategoryComponent; break
      case "newSubcategory": this.currentComponent = NewSubcategoryComponent; break
      case "categoryDetails": this.currentComponent = CategoryDetailsComponent; break
      case "nodeDetails": this.currentComponent = ChildrenDetailsComponent; break
      case "editCategory": this.currentComponent = EditCategoryComponent; break
    }
  }
  navigationHistory(id: string, data?: any | null) {
    const parent = this.appPage?.some(item => item.id_nav == id && item.node === 'parent');
    const indice = this.navHistory.findIndex(obj => obj.id == id);
    // console.log(parent , indice)
    if (parent) {
      this.navHistory.length = 0;
      this.currentIndex = -1;
    }
    if (indice <= 0) {
      this.navHistory.push({ id, data });
      this.currentIndex++;
    } else {
      this.navHistory = this.navHistory.slice(0, indice + 1);
    }
    // console.log('currentIndice :'+this.currentIndex)
    // console.log('indice: '+indice)
    // console.log(this.navHistory)
  }
  //#endregion
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
        "nodos":{
          "map":"function(doc){ if(doc.type === 'category' && doc.parent_id)emit(doc.parent_id, doc)}"
        }
      },
    }
    this.categorySvc.createQuery(query)
  }
  // //doc.metadata.lastUpdate.date,{id:doc._id,label:doc.label,icon:doc.icon,status:doc.status,nodes:doc.nodes,update:{type:doc.metadata.update.type,user:doc.metadata.update.user,date:doc.metadata.update.date}}
  //#endregion
}
