import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { NavigationData } from 'src/app/shared/utils/services/navigation.service';
import { ICategoryModel, NodeType } from 'src/app/core/interface/category-model';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { INavigationData } from '../../utils/category-interface';

@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss', '../components-commons.scss'],
  imports: [
    ReactiveFormsModule,
    WidgetsModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateNodeComponent implements OnInit {
  @Input() navigationData!: any;
  @Output() responseComponent = new EventEmitter<any>();
  rootNode: ICategoryModel | null = null;
  parentNode: ICategoryModel | null = null;
  nodeType!: NodeType;
  attributeFlag?: boolean;
  //*Form
  formData = this.fb.group({
    id: this.fb.control(''),
    label: this.fb.control(''),
    nodeType: this.fb.control(''),
    description: this.fb.control(''),
    status: this.fb.control(true),
    attributes: this.fb.control(false),
    icon: this.fb.control(''),
    display: this.fb.control(true),
    highlight: this.fb.control(true),
    rootID: this.fb.control(''),
    rootLabel: this.fb.control(''),
    parentID: this.fb.control(''),
    parentLabel: this.fb.control(''),
    parentLevel: this.fb.control(0),
  })
  constructor(private fb: FormBuilder, private categorySvc: CategoriesProductsService) { }
  ngOnInit() {
    this.initComponent(this.navigationData)
  }
  initComponent(navData: INavigationData) {
    if (navData.categoryData) {
      this.nodeType = 'child';
      this.parentNode = navData?.categoryData
    } else {
      this.nodeType = 'root';
    };
    this.formData.patchValue({ nodeType: this.nodeType });

  }
  onSubmit(form: FormGroup) {
    try {
      this.categorySvc.createNode(form, this.parentNode)
    } catch (e) {

    }
  }
  onNavigation(navData: NavigationData) {
    this.responseComponent.emit(navData)
  }
  handlerOption(e: any, type: string) {
    if (type === "status") this.formData.patchValue({ status: e.detail.checked });
    if (type === "attribute") { this.formData.patchValue({ attributes: e.detail.checked }); this.attributeFlag = e.detail.checked };
    if (type === "display") this.formData.patchValue({ display: e.detail.checked });
    if (type === "highlight") this.formData.patchValue({ highlight: e.detail.checked });
    if (type === "nodetype") this.formData.patchValue({ nodeType: e.detail.value });
  }
}
