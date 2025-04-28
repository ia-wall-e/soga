import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { CommonModule } from '@angular/common';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
import { ICategoryData } from '../../utils/category-interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../components-commons.scss'],
  imports: [CommonModule, WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  data: any = null;
  totalRows?: number;
  totalProducts?:number;
  updates?: any[];
  lastUpdate: any;
  constructor(private categorySvc: CategoriesProductsService, private navigationSvc: NavigationService) { }
  ngOnInit() {
    this.getData();

  }
  getData() {
    this.categorySvc.getOverview()?.then((r: any) => {
      if (r.rows.length > 0) {
        // console.log(r)
        this.data = r.rows;
        this.totalRows = r.total_rows;
        this.totalProducts= r.rows.reduce((total:number, obj:any)=>{return total + (Number(obj?.products)|| 0),0})
      }

    }).catch((e: any) => {
      console.error(e)
    })
  }
  onNavigation(idComponent: string, categoryData?:ICategoryData) {
    // console.log(data)
    this.navigationSvc.navigateTo(idComponent,categoryData)
  }
}
