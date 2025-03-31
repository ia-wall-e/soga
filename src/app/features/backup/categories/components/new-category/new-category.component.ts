import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss','../components-commons.scss'],
   imports: [WidgetsModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewCategoryComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
