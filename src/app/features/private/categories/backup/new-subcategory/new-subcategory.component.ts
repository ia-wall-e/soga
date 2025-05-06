import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { DefinedAttributesComponent } from '../category-attributes/defined-attributes/defined-attributes.component';
import { CustomAttributesComponent } from '../category-attributes/custom-attributes/custom-attributes.component';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { NavigationService } from 'src/app/shared/utils/services/navigation.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ICategoryData } from '../../utils/category-interface';

@Component({
  selector: 'app-new-subcategory',
  templateUrl: './new-subcategory.component.html',
  styleUrls: ['./new-subcategory.component.scss', '../components-commons.scss'],
  imports: [
    WidgetsModule,
    CommonModule,
    ReactiveFormsModule,
    DefinedAttributesComponent,
    CustomAttributesComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NewSubcategoryComponent implements OnInit {
  //#Propiedades
  attrOne: any = DefinedAttributesComponent;
  attrTwo: any = CustomAttributesComponent;
  attributeFlag?: boolean;
  categoryData!: ICategoryData;
  //**Formulario
  formData = this.fb.group({
    id: this.fb.control(''),
    name: this.fb.control(''),
    description: this.fb.control(''),
    status: this.fb.control(true),
    attributes: this.fb.control(false),
  })
  constructor(private categorySvc: CategoriesProductsService, private navSvc: NavigationService, private fb: FormBuilder) { }
  ngOnInit() {
    this.categoryData = this.navSvc.getCurrentNavigation().data;
    console.log(this.categoryData)
  }
  onChange(e: any, type: string) {
    if (type === "status") this.formData.patchValue({ status: e.detail.checked });
    if (type === "attribute") { this.formData.patchValue({ attributes: e.detail.checked }); this.attributeFlag = e.detail.checked };
  }
  onSubmit(fm: FormGroup) {
    this.categorySvc.putNode(fm.value, this.categoryData)
  }
}
