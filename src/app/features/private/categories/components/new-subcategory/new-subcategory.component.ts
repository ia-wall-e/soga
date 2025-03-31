import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { DefinedAttributesComponent } from '../category-attributes/defined-attributes/defined-attributes.component';
import { CustomAttributesComponent } from '../category-attributes/custom-attributes/custom-attributes.component';
@Component({
  selector: 'app-new-subcategory',
  templateUrl: './new-subcategory.component.html',
  styleUrls: ['./new-subcategory.component.scss','../components-commons.scss'],
  imports: [
    WidgetsModule,
    CommonModule,
    DefinedAttributesComponent,
    CustomAttributesComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NewSubcategoryComponent implements OnInit {
attrOne:any= DefinedAttributesComponent;
attrTwo:any=CustomAttributesComponent;
attrComponent:boolean= false
  constructor() { }

  ngOnInit() { }
onChange(e:any){
  this.attrComponent=e.detail.checked;
  console.log(e.detail.checked)
}
}
