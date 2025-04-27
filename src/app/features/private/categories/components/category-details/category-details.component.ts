import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { ICategoryData } from '../../utils/category-interface';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss', '../components-commons.scss'],
  imports: [WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryDetailsComponent implements OnInit, AfterViewInit {
  item: any;
  categoryData!: ICategoryData;
  nodes?:any;
  constructor(private navigationSvc: NavigationService, private categorySvc: CategoriesProductsService) { }

  ngOnInit() {

    // this.loadData(outputData);
  }
  ngAfterViewInit() {
    this.handlerData()
  }
  handlerData() {
    this.categoryData = this.navigationSvc.getCurrentNavigation().data;
    // console.log(this.categoryData)
    const rootID = this.categoryData?.parentID;
    this.categorySvc.getRoot(rootID)?.then((r)=>{
      // console.log(r);
      this.item = r;
    })
    this.categorySvc.getNodes(rootID)?.then((r)=>{
      this.nodes= r;
      // console.log(this.nodes)
    })
  }
  onNavigation(nav: string, data?:any) {
    // console.log(this.categoryData)
    if (nav == "addNode") {
      this.navigationSvc.navigateTo('newSubcategory', this.categoryData)
    } else if (nav == 'edit') {
      this.navigationSvc.navigateTo('editCategory', this.categoryData)
    } else if(nav=="goToNode"){
      this.categoryData.childID= data;
      // console.log(this.categoryData)
      this.navigationSvc.navigateTo('nodeDetails', this.categoryData)
    }
  }
}
