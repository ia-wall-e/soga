import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DefinedAttributesComponent } from '../category-attributes/defined-attributes/defined-attributes.component';
import { CustomAttributesComponent } from '../category-attributes/custom-attributes/custom-attributes.component';
import { ICategoryModel } from 'src/app/core/interface/category-model';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';

@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss', '../components-commons.scss'],
  imports: [
    ReactiveFormsModule,
    WidgetsModule,
    CommonModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateNodeComponent implements OnInit {
  @Input() categoryData!: ICategoryModel;
  @Output() navigationData? = new EventEmitter<any>();
  parentNode!: ICategoryModel;
  attrOne: any = DefinedAttributesComponent;
  attrTwo: any = CustomAttributesComponent;
  attributeFlag?: boolean;
  formData = this.fb.group({
    id: this.fb.control(''),
    label: this.fb.control(''),
    description: this.fb.control(''),
    status: this.fb.control(true),
    attributes: this.fb.control(false),
    icon: this.fb.control('bookmark-outline'),
    display: this.fb.control(true),
    highlight: this.fb.control(true),
    rootID: this.fb.control(''),
    rootLabel: this.fb.control(''),
    parentID: this.fb.control(''),
    parentLabel: this.fb.control(''),
    parentLevel: this.fb.control(''),
  })
  constructor(private fb: FormBuilder, private categorySvc: CategoriesProductsService) { }

  ngOnInit() {
    // console.log(this.categoryData);
    (this.categoryData)? this.parentNode= this.createParentObjModel(this.categoryData): null;
  }

  onSubmit(form: FormGroup, parentData:ICategoryModel) {
    form.patchValue({
      rootID: parentData.rootID,
      rootLabel:parentData.rootLabel,
      parentID:parentData.parentID,
      parentLabel:parentData.parentLabel,
      parentLevel: parentData.parentLevel,
    });
    console.log(form.value);
    this.categorySvc.createNode('node', form);
  }
  onNavigation() {
    this.navigationData?.emit('Hola')
  }
  toggleAttributes(e: any, type: string) {
    if (type === "status") this.formData.patchValue({ status: e.detail.checked });
    if (type === "attribute") { this.formData.patchValue({ attributes: e.detail.checked }); this.attributeFlag = e.detail.checked };
  }
  toggleStatus(event: any) {
    this.formData.patchValue({ status: event.detail.checked });
  }
  toggleDisplay(e: any) {
    this.formData.patchValue({ display: e.detail.checked })
  }
  toggleHighlight(e: any) {
    this.formData.patchValue({ highlight: e.detail.checked })
  }
  private createParentObjModel(parentData: ICategoryModel):ICategoryModel {
    console.log(parentData)
    if(parentData.level===1){
      parentData.rootID=parentData._id;
      parentData.rootLabel=parentData.label;
      parentData.parentID=parentData._id;
      parentData.parentLabel=parentData.label;
      parentData.parentLevel=parentData.level;
    }
    return parentData;
  }
}
