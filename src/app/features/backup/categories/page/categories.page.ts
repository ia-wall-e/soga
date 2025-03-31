import { Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
/** */
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NewCategoryComponent } from '../components/new-category/new-category.component';
import { CategoriesOverviewComponent } from '../components/categories-overview/categories-overview.component';
import { NewSubcategoryComponent } from '../components/new-subcategory/new-subcategory.component';
import { CategoryDetailsComponent } from '../components/category-details/category-details.component';
import { ChildrenDetailsComponent } from '../components/children-details/children-details.component';
import { EditCategoryComponent } from '../components/edit-category/edit-category.component';
/**/

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit {
    public folder!: string;
    private activatedRoute = inject(ActivatedRoute);
    currentComponent: any=EditCategoryComponent;
    public appPages = [
      { title: 'Dashboard',id:'dashboard',  icon: 'grid' },
      { title: 'Categorias',id:'overview',  icon: 'apps' },
      { title: 'Detalles categoria',id:'categoryDetails',  icon: 'add-circle' },
      { title: 'Detalles subcategoria',id:'childrenDetails',  icon: 'add-circle' },
      { title: 'Agregar categoria',id:'newCategory',  icon: 'add-circle' },
      { title: 'Agregar subcategoria',id:'newSubcategory',  icon: 'add-circle' },
      { title: 'Editar Categoria',id:'editCategory',  icon: 'hammer' },
    ];
    // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    constructor() {}
  
    ngOnInit() {
      this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    }
    loadComponent(id:string){
      console.log(id)
      switch(id){
        case "dashboard": this.currentComponent=DashboardComponent; break
        case "newCategory": this.currentComponent=NewCategoryComponent; break
        case "newSubcategory": this.currentComponent=NewSubcategoryComponent; break
        case "overview": this.currentComponent=CategoriesOverviewComponent; break
        case "categoryDetails": this.currentComponent=CategoryDetailsComponent; break
        case "childrenDetails": this.currentComponent=ChildrenDetailsComponent; break
        case "editCategory": this.currentComponent=EditCategoryComponent; break
      }
    }
 
}
/**OLD
  //#region 
  step: number = 2;
  isModalOpen: boolean = false;
  newCateg?: string;
  //#
  newCategoryFm = this.fb.group({
    category: this.fb.control('')
  })
  newSubCategFm = this.fb.group({
    subcategory: this.fb.control(''),
    label: this.fb.control('')
  })
  constructor(private fb: FormBuilder, private ctgSvc: CategoriesProductsService, private utilsCtrl: UtilsService) { }
  createCategory(fm: FormGroup, next?: boolean) {
    const newCateg_ = fm.value;
    this.newCateg = newCateg_.category;
    this.ctgSvc.newCategory(this.newCateg)
    next ? this.nextStep() : null;
  }
  createSubCateg(fm: FormGroup, category: any) {
    this.ctgSvc.newSubCategory(fm.value, category)
  }
  //#navigation form-dinamy
  nextStep() {
    this.step++;
  }
  //#Modal categories
  openModalCat(status: boolean) {
    this.isModalOpen = status;
  }
  //#endregion
 */
