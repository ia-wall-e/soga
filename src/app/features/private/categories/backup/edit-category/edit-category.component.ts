import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { ICategoryData } from '../../utils/category-interface';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss','../components-commons.scss'],
  imports:[WidgetsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditCategoryComponent  implements OnInit {
@Input() categoryData!:ICategoryData;
  constructor() { }

  ngOnInit() {
    console.log(this.categoryData)
  }

}
