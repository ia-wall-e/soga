import { Component, OnInit } from '@angular/core';
/** */
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NewCategoryComponent } from '../components/new-category/new-category.component';
import { CategoriesOverviewComponent } from '../components/categories-overview/categories-overview.component';
import { NewSubcategoryComponent } from '../components/new-subcategory/new-subcategory.component';
import { CategoryDetailsComponent } from '../components/category-details/category-details.component';
import { ChildrenDetailsComponent } from '../components/children-details/children-details.component';
import { EditCategoryComponent } from '../components/edit-category/edit-category.component';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit {
  public folder!: string;
  currentComponent: any= DashboardComponent;
  currentNav?: string;
  //#region app-components y navigation(buttons -id)
  public appPage? = [
    { title: 'Dashboard', id_nav: 'dashboard', icon: 'grid', visible: true },
    { title: 'Categorias', id_nav: 'overview', icon: 'bookmarks', visible: true },
    { title: 'Crear categoria', id_nav: 'newCategory', icon: 'add-circle', visible: true },
    { title: 'Detalles categoria', id_nav: 'categoryDetails', icon: 'add-circle', visible: false },
    { title: 'Detalles subcategoria', id_nav: 'childrenDetails', icon: 'add-circle', visible: false },
    { title: 'Agregar subcategoria', id_nav: 'newSubcategory', icon: 'add-circle', visible: false },
    { title: 'Editar Categoria', id_nav: 'editCategory', icon: 'hammer', visible: false },
  ];
  get btnApps(): { title: string; id_nav: string; icon: string; visible: boolean; }[] {
    return this.appPage ? this.appPage.filter(item => item.visible) : [];
  }
  //#endregion
  constructor(private categorySvc: CategoriesProductsService, private navigationSvc: NavigationService) { }
  //#region
  ngOnInit() {
    this.navigationSvc.navigation$.subscribe(
      (nav) => {
        this.selectComponent(nav.id); 
      }
    );
  }

  onLoadComponent(id_nav: any) {
    this.navigationSvc.navigateTo(id_nav)
  }
  selectComponent(id_nav: any) {
    switch (id_nav) {
      case "dashboard": this.currentComponent = DashboardComponent; break
      case "overview": this.currentComponent = CategoriesOverviewComponent; break
      case "newCategory": this.currentComponent = NewCategoryComponent; break
      case "newSubcategory": this.currentComponent = NewSubcategoryComponent; break
      case "categoryDetails": this.currentComponent = CategoryDetailsComponent; break
      case "childrenDetails": this.currentComponent = ChildrenDetailsComponent; break
      case "editCategory": this.currentComponent = EditCategoryComponent; break
    }
  }
  //#endregion
  //#region example creacion query
  createDesign() {
    const query = {
      "_id": "_design/categorias",
      "lenguage": "javascript",
      "views": {
        "overview": {
          "map": "function(doc) { if(doc.type === 'root') emit(doc.metadata.update.date,{id:doc._id,label:doc.label,icon:doc.icon,status:doc.status,nodes:doc.nodes,update:{type:doc.metadata.update.type,user:doc.metadata.update.user,date:doc.metadata.update.date}}); }",
        }
      },
    }
    this.categorySvc.createQuery(query)
  }
  //#endregion
}
