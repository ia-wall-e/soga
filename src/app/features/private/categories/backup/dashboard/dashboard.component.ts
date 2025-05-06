import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { CommonModule } from '@angular/common';
import {  INavigationData } from '../../utils/category-interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../components-commons.scss'],
  imports: [CommonModule, WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  @Output() navigationData = new EventEmitter<INavigationData>();
  items?: any[] | null = null;
  totalRows?: number;
  totalProducts?: number;
  updates?: any[];
  lastUpdate: any;
  constructor(private categorySvc: CategoriesProductsService) { }
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.categorySvc.getOverview()?.then((r: any) => {
      if (r.rows.length > 0) {
        // console.log(r)
        this.handlerData(r)
      }

    }).catch((e: any) => {
      console.error(e)
    })
  }
  handlerData(data:any){
    this.items = data.rows.value;
    this.totalRows = data.total_rows;
    this.totalProducts = data.rows.reduce((total: number, obj: any) => { return total + (Number(obj?.products) || 0), 0 })
  }
  onNavigation(navData:INavigationData) {
    this.navigationData.emit(navData)
  }
}
