import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesProductsService } from 'src/app/core/services/categories-products.service';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss', '../components-commons.scss'],
  imports: [CommonModule, ReactiveFormsModule, WidgetsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewCategoryComponent implements OnInit {
  newCategoryFm = this.fb.group({
    name: this.fb.control('',Validators.required),
    description: this.fb.control('',Validators.required),
    icon:this.fb.control('bookmark-outline'),
    status: this.fb.control(true),
    display: this.fb.control(true),
    highlight:this.fb.control(true)
  })
  constructor(private fb: FormBuilder, private categorySvc:CategoriesProductsService) { }

  ngOnInit() { }
  //#region
  onSubmit(fm:FormGroup){
    this.categorySvc.putRoot(fm.value)
  }
  //#endregion
  //#
  toggleStatus(event: any) {
    this.newCategoryFm.patchValue({ status: event.detail.checked });
  }
  toggleDisplay(e: any) {
    this.newCategoryFm.patchValue({ display: e.detail.checked })
  }
   toggleHighlight(e:any){
    this.newCategoryFm.patchValue({highlight: e.detail.checked})
   }
}
