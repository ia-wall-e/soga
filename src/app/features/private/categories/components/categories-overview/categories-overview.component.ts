import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.scss','../components-commons.scss'],
  imports: [CommonModule,WidgetsModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesOverviewComponent  implements OnInit {
data?: any;
  constructor(private categorySvc: CategoriesProductsService) { }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.categorySvc.getOverview()?.then((r: any) => { 
      // console.log(r.rows)
      this.data = r.rows;
    }).catch((e: any) => {
      console.log(e)
    })
  }

}
