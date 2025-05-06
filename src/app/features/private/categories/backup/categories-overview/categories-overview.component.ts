import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
import { INavigationData } from '../../utils/category-interface';

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.scss', '../components-commons.scss'],
  imports: [CommonModule, WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesOverviewComponent implements OnInit {
  @Output() navigationData = new EventEmitter<INavigationData>();
  items?:any[];
  constructor(private categorySvc: CategoriesProductsService, private navigationSvc: NavigationService) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.categorySvc.getOverview()?.then((r: any) => {
      console.log(r.rows)
      this.items= r.rows;
    }).catch((e: any) => {
      console.log(e)
    })
  }
  onNavigation(navData: INavigationData) {
    this.navigationData.emit(navData)
  }
}
