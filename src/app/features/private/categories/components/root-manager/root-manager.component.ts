import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { INavigationData } from '../../utils/category-interface';
import { ICategoryModel } from 'src/app/core/interface/category-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root-manager',
  templateUrl: './root-manager.component.html',
  styleUrls: ['./root-manager.component.scss', '../components-commons.scss'],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RootManagerComponent implements OnInit {
  @Input() categoryData?: ICategoryModel;
  @Output() navigationData? = new EventEmitter<INavigationData>();
  item?: ICategoryModel;
  childNodes?: ICategoryModel[];
  constructor(private categorySvc: CategoriesProductsService) { }
  ngOnInit() {
    this.initComponent();
  }
  initComponent() {
    try {
      const validation = this.categorySvc.validationsCategoryData(this.categoryData)
      if (!validation.status) throw new Error(`${validation.message}`)
      const categoryID = this.categoryData?._id;
      this.item = this.categoryData;
    } catch (e) {
      console.error(`ERROR:${e}`)
    }
  }
  onNavigation(navData: INavigationData) {
    this.navigationData?.emit(navData)
  }
  handlerData() { }
  handlerErrorComponent() {
    throw new Error('Error al cargar el componente')
  }
}
