import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesProductsService {
  private categorySource = new BehaviorSubject<any>(null);
  categorySource$ = this.categorySource.asObservable();
  constructor(private dbSvc: DatabaseService) {
    this.dbSvc.connectDataBase('categories-products')
  }
  //#API
  newCategory(data: any) {
    const date = new Date().toISOString();
    const update = { _id: data.name, date: date, type: 'create', user: 'admin-1233', info: null };
    if (data === "") throw new Error("Ingresa una categoria");
    const doc = {
      _id: data.name,
      category: data.name,
      label: data.name,
      description:data.description || null,
      type: 'root',
      nivel: 1,
      nodes: 0,
      status: data.status,
      display: data.display,
      products: 0,
      icon: data.icon,
      metadata: {
        createDate: update,
        update: update,
      }
    }
    this.dbSvc.putDocument(doc);
  }
  getCategory(id: string) {
    return this.dbSvc.getDocument(id)
  }
  getOverview() {
    return this.dbSvc.getByQuery('categorias/overview?descending=true&limit=10')?.then((x: any) => { return x }).catch((e: any) => console.log(e))
  }
  newSubCategory(subCategObj: any, category: any) {
    if (category && category.length < 0) throw new Error('Se presento un problema con la categoria superior');
    if (Object.keys(subCategObj).length < 0) throw new Error('Debes ingresar la subcategoria y su etiqueta');
    // console.log(subCategObj)
    const subcategory = subCategObj.subcategory;
    const label_ = subCategObj.label;
    // console.log(subcategory)
    // console.log(label_)
    const doc = {
      subcategory: subcategory,
      type: 'subcategory',
      nivel: 2,
      label: label_,
      parent_id: category
    }
    // this.db?.post(doc)
  }
  //# comunicacion entre componentes
  setCategory(source: string) {
    console.log(source)
    // this.categorySource.next(source);
  }
  //#design
  createQuery(desigDoc: any) {
    this.dbSvc.getDocsByViews(desigDoc)
      ?.then(r => console.log(r))
      .catch(e => console.log(e))
  }

}
