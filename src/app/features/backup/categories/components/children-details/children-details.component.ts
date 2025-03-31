import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
@Component({
  selector: 'app-children-details',
  templateUrl: './children-details.component.html',
  styleUrls: ['./children-details.component.scss','../components-commons.scss'],
  imports:[WidgetsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenDetailsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
