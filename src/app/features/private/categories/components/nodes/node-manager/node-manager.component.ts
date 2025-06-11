import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategoryModel, NodeType } from 'src/app/core/interface/category-model';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { INavigationData } from '../../../utils/category-interface';
import { CommonModule } from '@angular/common';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';

@Component({
  selector: 'app-node-manager',
  templateUrl: './node-manager.component.html',
  styleUrls: ['./node-manager.component.scss', '../../components-commons.scss'],
  imports: [WidgetsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NodeManagerComponent implements OnInit {
  @Input() navigationData!: INavigationData;
  @Output() responseComponent = new EventEmitter<any>()
  node: ICategoryModel | null = null;
  children: any[] | null = null;
  parent: ICategoryModel | null = null;
  nodeType?: NodeType;
  constructor(private categorySvc: CategoriesProductsService) { }

  ngOnInit() {
    // console.log(this.navigationData);y
    this.initComponent(this.navigationData);
  }
  initComponent(navData: INavigationData) {
    try {
      if (navData.categoryData) {
        const category = navData.categoryData;
        // this.nodeType = this.categorySvc.identifyNode(category);
        this.node = category;
        this.nodeType= category.nodeType;
        this.getChildNodes(category._id);
      } else if(navData.categoryID){
        // if(navData.categoryID){throw new Error('No existe la cateogria o se ha presentado un problema')}
        const categoryID:string = navData.categoryID;
        this.categorySvc.getNode(categoryID)?.then((r: any) => {
          console.log(r);
          this.node = r;
        })
        // this.nodeType = this.categorySvc.identifyNode(this.node as ICategoryModel);
        // console.log(this.nodeType)
        this.getChildNodes(categoryID);
      }

      //   // console.log(typeof this.navigationData);
      //   // console.log(this.navigationData);
      //   // console.log(this.nodeType);
    } catch (e) {
      console.error(e)
    }
  }
  onNavigation(navData: INavigationData): void {
    this.responseComponent.emit(navData);
  }
  private getChildNodes(categoryID: string) {
    this.categorySvc.getChildrenNodes(categoryID)?.then((r: any) => {
      r.length > 0 ? this.children = r : this.children = null;
      // console.log(this.children)
    })
  }


}
