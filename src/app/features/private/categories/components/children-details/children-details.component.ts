import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Injector, OnInit } from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { ICategoryData } from '../../utils/category-interface';
@Component({
  selector: 'app-children-details',
  templateUrl: './children-details.component.html',
  styleUrls: ['./children-details.component.scss', '../components-commons.scss'],
  imports: [WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenDetailsComponent implements OnInit {
  categoryData?: ICategoryData;
  childID?: string;
  item?: any;
  nodes: any;
  injectorCustom?: Injector; 
  constructor(@Inject('componentData') public componentData: ICategoryData,private injector:Injector, private categorySvc: CategoriesProductsService, private navSvc: NavigationService) { }

  ngOnInit() {
    this.categoryData = this.navSvc.getCurrentNavigation().data;
    // console.log(this.categoryData)
    console.log(this.componentData)
    this.handlerData()
  }

  handlerData() {
    // console.log(this.componentData)
    this.childID = this.categoryData?.childID;
    this.categorySvc.getRoot(this.childID)?.then((r) => {
      // console.log(r);
      this.item = r;
    });
    this.categorySvc.getNodes(this.childID)?.then((r) => {
      this.nodes = r;
      // console.log(this.nodes)
    })
  }
  childComponentInjector(data: ICategoryData) {
    return Injector.create({
      providers: [{ provide: 'componentData', useValue: data }],
      parent: this.injector
    })
  }
  onNavigation(componentID: string, data?: any) {
    const parentId = this.item._id;
    const levelParent = this.item.level;
    const childID = this.childID;
    if (componentID == "nodeDetails") {
      this.componentData = data;
     this.injectorCustom= this.childComponentInjector(this.componentData)
      console.log(this.componentData)
  
      /*****/
      // const data_: ICategoryData = {
      //   parentID: parentId,
      //   parentLevel: levelParent,
      //   childID: childID
      // }
      // console.log(data, componentID);
      // this.navSvc.navigateTo(componentID, data_)
    } else if (componentID == "newSubcategory") {

      /******/
      const data_: ICategoryData = {
        parentID: parentId,
        parentLevel: levelParent
      }
      // console.log(data_);
      // this.navSvc.navigateTo(componentID, data_)
    }


  }
}
