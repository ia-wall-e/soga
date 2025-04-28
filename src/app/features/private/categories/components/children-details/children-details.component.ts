import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class ChildrenDetailsComponent implements OnInit,OnChanges {
  // @Input() data: any;
  categoryData?: ICategoryData;
  childID?:string;
  item?: any;
  nodes: any;
  constructor(private categorySvc: CategoriesProductsService, private navSvc: NavigationService) { }

  ngOnInit() {
    this.categoryData = this.navSvc.getCurrentNavigation().data;
    // console.log(this.categoryData)
    this.handlerData()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryData']) {
      console.log('Componentchanged');
    }
  }
  handlerData() {
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
  onNavigation(componentID: string, data?: any) {
    const parentId = this.item._id;
    const levelParent = this.item.level;
    const childID= this.childID;
    if (componentID == "nodeDetails") {
      const data: ICategoryData = {
        parentID: parentId,
        parentLevel: levelParent,
        childID:childID
      }
      console.log(data, componentID);
      this.navSvc.navigateTo(componentID, data)
    } else if (componentID == "newSubcategory") {
      const data: ICategoryData = {
        parentID: parentId,
        parentLevel: levelParent
      }
      console.log(data);
      this.navSvc.navigateTo(componentID, data)
    }


  }
}
