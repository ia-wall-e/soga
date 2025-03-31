import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.scss','../components-commons.scss'],
  imports: [WidgetsModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesOverviewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
