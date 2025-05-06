import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs'
import { ICategoryModel } from '../interface/category-model';
import { FormGroup } from '@angular/forms';
// Alias
type NodeType = 'root' | 'node';
//inject
@Injectable({
  providedIn: 'root'
})
export class CategoriesProductsService {
  private categorySource = new BehaviorSubject<any>(null);
  categorySource$ = this.categorySource.asObservable();

  constructor(private dbSvc: DatabaseService) {
    this.dbSvc.connectDataBase('categories-products')
  }
  //#
  createNode(nodeType: NodeType, formData: any, parentData?:ICategoryModel) {
    console.log(formData)
    const doc = this.builderCategoryModel(nodeType, formData);
    this.saveNode(doc);
  }
  getNode(id:string){
    return this.dbSvc.getDocument(id)
  }
  getNodes(id: any) {
    return this.dbSvc.getByQuery(`categorias/nodos?key="${id}"`)?.then((r) => {
      return r?.rows
    })
  }
  getOverview() {
    return this.dbSvc.getByQuery('categorias/overview?descending=true&limit=10')?.then((x: any) => { return x }).catch((e: any) => console.log(e))
  }
  //# constructor Modelo y Validaciones
  builderCategoryModel(nodeType: NodeType, data: any): ICategoryModel {
    // console.log(data);
    if (data instanceof FormGroup) {
      const validate = this.validationsCategoryData(data.value);
      if (!validate.status) throw new Error(`ERROR: ${validate.message}`);
      const categoryData = this.createObjetModel(nodeType,data.value);
      console.log(categoryData)
      return categoryData;
    }
    throw new Error('El parámetro data no es una instancia de FormGroup');
  }
  private createObjetModel(nodeType:NodeType,categoryData:any):ICategoryModel{
    const date = new Date().toISOString();
    const update = { _id: categoryData.label, date: date, type: 'create', user: 'admin-1233', info: null };
     // Declaración común
     let nodes_: number | null = null;
     let categoryID_: string;
     let nodeLevel_: number;
     let rootID_: string | null = null;
     let rootLabel_: string | null = null;
     let parentID_: string | null = null;
     let parentLabel_: string | null = null;
     let parentLevel_: number | null = null;
     /**Declaracion por tipo de node*/
     if (nodeType === 'root') {
       categoryID_ = `root:${categoryData.label}`;
       nodeLevel_ = 1;
       nodes_ = 0;
     } else if (nodeType === 'node') {
       rootID_ = categoryData.rootID;
       rootLabel_=categoryData.rootLabel
       parentID_ = categoryData.parentID;
       parentLabel_=categoryData.parentLabel
       parentLevel_ = categoryData.parentLevel;
       categoryID_ = `node:${categoryData.id}`;
       nodeLevel_ = categoryData.parentLevel + 1;
       nodes_ = 0;
     } else {
       throw new Error('Tipo de nodo inválido');
     }
     /**constructor Model*/
    const doc = {
       _id: categoryID_,
       label: categoryData.label,
       type: 'category',
       level: nodeLevel_,
       status: categoryData.status,
       display: categoryData.display,
       description: categoryData.description,
       highlight: categoryData.highlight,
       nodes: nodes_,
       icon: categoryData.icon,
       products: 0,
       metadata: {
         createDate: update,
         lastUpdate: update,
       },
       rootID: rootID_,
       rootLabel:rootLabel_,
       parentID: parentID_,
       parentLabel:parentLabel_,
       parentLevel: parentLevel_,
     }
     return doc;
  }
  validationsCategoryData(categoryData: any): { status: boolean, message?: string } {
    const result = {
      status: true,
      message: 'valida'
    };
    /**Validations */
    if (!categoryData) {
      result.status = false
      result.message = ("Ingresa una categoria");
      return result;
    };
    if (typeof categoryData != 'object') {
      result.status = false;
      result.message = ('objeto de datos no valido');
      return result;
    }
    for (const parameter in categoryData) {
      const value = categoryData[parameter];
      // console.log(value)
      // if (value.length <= 0) {
      //   result.status = false;
      //   result.message = (`${parameter} no tiene ningun valor`)
      //   return result;
      // }
    }
    // console.log(result);
    return result;
  }
  //# DB
  private saveNode(doc: ICategoryModel) {
    this.dbSvc.putDocument(doc);
  }
  //#handlers
  private handlerResponse(){}
  //#design - queries couchDB
  // createQuery(desigDoc: any) {
  //   this.dbSvc.getDocsByViews(desigDoc)
  //     ?.then(r => console.log(r))
  //     .catch(e => console.log(e))
  // }
}
/** OLD
 *

  }
  getRoot(id: any) {
    return this.dbSvc.getDocument(id)
  }
  getNodes(id: any) {
    return this.dbSvc.getByQuery(`categorias/nodos?key="${id}"`)?.then((r) => {
      // console.log(r);
      return r?.rows
    })
  }
  getOverview() {
    return this.dbSvc.getByQuery('categorias/overview?descending=true&limit=10')?.then((x: any) => { return x }).catch((e: any) => console.log(e))
  }
      builderCategoryModel(nodetype: string, data: any) {
    // console.log(data)
    if (data instanceof FormGroup) {
      if (!data.value) throw new Error("Ingresa una categoria");
     const validate = this.validationsCategoryData(data.value);
     console.log(validate)
    }
    // const date = new Date().toISOString();
    // const update = { _id: data.name, date: date, type: 'create', user: 'admin-1233', info: null };
    // const categoryData: ICategoryModel = {
    //   _id: `root:${data.name}`,
    //   // categoryID:  `root:${data.name}`,
    //   label: data.name,
    //   type: 'category',
    //   level: 1,
    //   rootID: null,
    //   parentID: null,
    //   parentLevel: null,
    //   nodes: 0,
    //   status: data.status,
    //   display: data.display,
    //   description: data.description || null,
    //   products: 0,
    //   icon: data.icon,
    //   highlight: data.highlight,
    //   metadata: {
    //     createDate: update,
    //     lastUpdate: update,
    //   }
    // }
    // return categoryData
  }
 */