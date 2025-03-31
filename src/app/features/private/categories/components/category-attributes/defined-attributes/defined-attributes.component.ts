import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@Component({
  selector: 'app-defined-attributes',
  templateUrl: './defined-attributes.component.html',
  styleUrls: ['./defined-attributes.component.scss','../../components-commons.scss'],
  imports:[WidgetsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DefinedAttributesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
