import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss','../components-commons.scss'],
  imports:[WidgetsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditCategoryComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
