import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@Component({
  selector: 'app-custom-attributes',
  templateUrl: './custom-attributes.component.html',
  styleUrls: ['./custom-attributes.component.scss','../../components-commons.scss'],
  imports:[WidgetsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomAttributesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
