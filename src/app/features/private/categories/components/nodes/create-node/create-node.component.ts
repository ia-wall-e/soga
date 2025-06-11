import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { NavigationData } from 'src/app/shared/utils/services/navigation.service';
import { ICategoryModel, NodeType } from 'src/app/core/interface/category-model';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
import { INavigationData } from '../../../utils/category-interface';

@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss', '../../components-commons.scss'],
  imports: [
    ReactiveFormsModule,
    WidgetsModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateNodeComponent implements OnInit {
  @Input() navigationData!: INavigationData;
  @Output() responseComponent = new EventEmitter<any>();
  rootNode: ICategoryModel | null = null;
  parentNode: ICategoryModel | null = null;
  nodeType: NodeType = "child";
  attributeFlag?: boolean;
  //*Form
  formData = this.fb.group({
    id: this.fb.control(''),
    label: this.fb.control(''),
    nodeType: this.fb.control(''),
    description: this.fb.control(''),
    status: this.fb.control(true),
    attributes: this.fb.control(false),
    icon: this.fb.control(null),
    display: this.fb.control(true),
    highlight: this.fb.control(true),
    rootID: this.fb.control(null),
    rootLabel: this.fb.control(null),
    parentID: this.fb.control(null),
    parentLabel: this.fb.control(null),
    parentLevel: this.fb.control(0),
  })
  constructor(private fb: FormBuilder, private categorySvc: CategoriesProductsService) { }
  ngOnInit() {
    // console.log(this.navigationData);
    this.initComponent(this.navigationData)
  }
  initComponent(navData: INavigationData) {
    if (navData.categoryData) {
      // this.nodeType = 'child';
      this.parentNode = navData?.categoryData;
      // console.log(this.parentNode);
    } else {
      this.nodeType = 'root';
    };
    this.formData.patchValue({ nodeType: this.nodeType });

  }
  onSubmit(form: FormGroup) {
    // console.log(form.value)
    // console.log(this.nodeType);
    this.categorySvc.createCategoryModel(form, this.parentNode)
    try {
      this.categorySvc.createNode(form, this.parentNode)?.then(r => {
        if (r.ok == true) {
          this.reDirection();
        }
      }).catch(e => { console.log(e) });
    } catch (e) {
      console.error(e);
    }
  }
  private async reDirection(): Promise<void> {
    this.navigationData.componentID = "nodeManager";
    const nodeID = this.formData.value.id as string;
    const nodeType = this.formData.value.nodeType as string;
    this.navigationData.categoryID = `${nodeType}:${nodeID}`;
    // console.log(this.navigationData.categoryID);
    this.navigationData.categoryData = await this.categorySvc.getNode(this.navigationData.categoryID)?.then();
    this.onNavigation(this.navigationData);
  }
  onNavigation(navData: INavigationData) {
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
