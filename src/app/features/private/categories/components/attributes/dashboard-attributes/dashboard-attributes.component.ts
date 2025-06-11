import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { INavigationData } from '../../../utils/category-interface';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@Component({
  selector: 'app-dashboard-attributes',
  templateUrl: './dashboard-attributes.component.html',
  styleUrls: ['./dashboard-attributes.component.scss', '../../components-commons.scss'],
  imports:[CommonModule,WidgetsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardAttributesComponent  implements OnInit {

    @Output() responseComponent = new EventEmitter<INavigationData>();
    items!: any[];
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
        if (!r) { throw new Error("Problemas con la base de datos") };
        if (r.length > 0) { this.handlerData(r) };
      }).catch((e: any) => { console.error(e) })
    }
    handlerData(data: any) {
      // console.log(data)
      this.items = data;
      this.totalRows = data.length;
      this.totalProducts = data.reduce((total: number, obj: any) => { return total + (Number(obj?.products) || 0), 0 })
    }
    onNavigation(navData: INavigationData) {
      this.responseComponent.emit(navData)
    }
}
