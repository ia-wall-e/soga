import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
@Component({
  selector: 'app-create-root',
  templateUrl: './create-root.component.html',
  styleUrls: ['./create-root.component.scss', '../components-commons.scss'],
  imports: [CommonModule, ReactiveFormsModule, WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateRootComponent  {
  formData = this.fb.group({
    label: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    icon: this.fb.control('bookmark-outline'),
    status: this.fb.control(true),
    display: this.fb.control(true),
    highlight: this.fb.control(true)
  })
  constructor(private fb: FormBuilder, private categorySvc:CategoriesProductsService) { }
  //#
  onNavigation(){}
  onSubmit(formData: FormGroup) {
    try{
      this.categorySvc.createNode('root', formData)
    }catch(e){
      console.error(e)
    }
   }
  //#

  toggleStatus(event: any) {
    this.formData.patchValue({ status: event.detail.checked });
  }
  toggleDisplay(e: any) {
    this.formData.patchValue({ display: e.detail.checked })
  }
  toggleHighlight(e: any) {
    this.formData.patchValue({ highlight: e.detail.checked })
  }
}
