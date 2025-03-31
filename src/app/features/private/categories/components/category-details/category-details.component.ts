import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss', '../components-commons.scss'],
  imports: [WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryDetailsComponent implements OnInit {
item:any;
inputData: any;
  constructor(private navigationSvc: NavigationService, private categorySvc: CategoriesProductsService) { }

  ngOnInit() {
    this.inputData = this.navigationSvc.getCurrentNavigation()
    const idCategory = this.inputData.data
    this.loadData(idCategory);
  }
  loadData(idCategory: string) {
    this.categorySvc.getCategory(idCategory)?.then((r)=>{this.item=r;console.log(r)})
  }
  addChild(){
    const idCategory= this.inputData.data;
    this.navigationSvc.navigateTo('newSubcategory', idCategory)
  }
}
