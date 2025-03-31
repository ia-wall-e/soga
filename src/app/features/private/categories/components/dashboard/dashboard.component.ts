import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { CommonModule } from '@angular/common';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../components-commons.scss'],
  imports: [CommonModule, WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  // @Output() emitCategory = new EventEmitter<any>()
  data: any = null;
  totalRows?: number;
  updates?: any[];
  lastUpdate: any;
  constructor(private categorySvc: CategoriesProductsService, private navigationSvc: NavigationService) { }
  ngOnInit() {
    this.getData();

  }
  getData() {
    this.categorySvc.getOverview()?.then((r: any) => {
      if (r.rows.length > 0) {
        this.data = r.rows;
        this.totalRows = r.total_rows;
        const sortedData = this.data.sort((a: any, b: any) =>
          new Date(b.metadata?.update.last).getTime() - new Date(a.metadata?.update.last).getTime()
        );
        this.lastUpdate = sortedData.slice(0, 5);
      }

    }).catch((e: any) => {
      console.error(e)
    })
  }
  onCategory(category: string) {
    console.log(category)
    this.navigationSvc.navigateTo('categoryDetails',category)
  }
}
