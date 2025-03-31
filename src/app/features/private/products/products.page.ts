import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FiltersProductsService } from 'src/app/core/services/filters-products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone:false
})
export class ProductsPage{

  step: number = 2;
  isModalOpen: boolean = false;
  //# fomr filters 
  newProductFm = this.fb.group({
    title: this.fb.control('', [Validators.required]),
  });
  get titleControl() {
    return this.newProductFm.get('title') as FormControl;
  }
  constructor(private fb: FormBuilder, private filterSvc: FiltersProductsService) { }
  //# agregar producto 
  createProduct(product: any) { }
  //#navigation form-dinamy
  nextStep() {
    this.step++;
  }
  //#Modal categories
  openModalCat(status: boolean) {
    this.isModalOpen = status;
  }

}
