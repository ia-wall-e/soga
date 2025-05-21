import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs'
import { ICategoryModel, NodeType } from '../interface/category-model';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CategoriesProductsService {
  constructor(private dbSvc: DatabaseService) {
    this.dbSvc.connectDataBase('categories-products-staging')
  }
  //#region - CRUD
  createNode(formData: any, parentNode?: ICategoryModel | null) {
    const doc: ICategoryModel = this.builderCategoryModel(formData, parentNode);
    // console.log(doc)
    this.saveNode(doc);
  }
  getNode(id: string) {
    return this.dbSvc.getDocument(id)
  }
  getOverview() {
    const path = 'categorias/overview';
    const options = {
      descending: true,
      limit: 10,
      include_docs: false
    }
    return this.getNodes(path, options)
  }
  getChildrenNodes(categoryID: string) {
    const path = 'categorias/nodos';
    const options = {
      key: categoryID,
    }
    return this.getNodes(path, options)
  }
  //#endregion
  //#region - METODOS DATA BASE
  private getNodes(endpoint: string, options?: any) {
    return this.dbSvc.getByEndpoint(endpoint, options)?.then((r: any) => {
      return this.handlerResponse(r)
    }).catch((e: any) => { throw e; });
  }
  private saveNode(doc: ICategoryModel) {
    this.dbSvc.putDocument(doc);
  }
  private handlerResponse(r: any) {
    // console.log(r.rows);
    return r.rows;
  }
  //#endregion
  //#region - CONSTRUCTOR OBJECTO MODEL CATEGORY
  builderCategoryModel(form: any, parentNode?: ICategoryModel | null): ICategoryModel {
    if (form instanceof FormGroup) {
      // 1.valdacion del formulario
      const validation = this.validationCategoryData(form.value)
      if (!validation.status) throw new Error(`ERROR: ${validation.message}`);
      // 2.crear objeto CategoryModel
      const categoryObj = this.createObjetModel(form, parentNode);
      // console.log(categoryObj)
      return categoryObj;
    }
    throw new Error('El parámetro data no es una instancia de FormGroup');
  }
  createObjetModel(formData: FormGroup, parentNode?: ICategoryModel | null): ICategoryModel {
    const date = new Date().toISOString();
    const node = formData.value;
    const update = { _id: node.label, date: date, type: 'create', user: 'admin-1233', info: null };
    // Declaración común
    let nodes_: number | null = 0;
    let categoryID_: string = `${node.nodeType}:${node.label}`;
    let level_: number;
    let rootID_: string | null = null;
    let rootLabel_: string | null = null;
    let parentID_: string | null = null;
    let parentLabel_: string | null = null;
    let parentLevel_: number | null = null;
    let icon_: string | null = null;
    let description_: string | null = null;
    if (node.nodeType === 'root') {
      level_ = 1;
    } else {
      if (!parentNode) throw new Error('Se presento un problema al crear esta subcategoria');
      level_ = parentNode.level + 1;
      if (parentNode.level == 1) {
        rootID_ = parentNode.rootID;
        rootLabel_ = parentNode.rootLabel;
        parentID_ = parentNode.parentID;
        parentLabel_ = parentNode.parentLabel;
        parentLevel_ = parentNode.parentLevel;
      } else {
        rootID_ = parentNode.rootID;
        rootLabel_ = parentNode.rootLabel;
        parentID_ = parentNode.parentID;
        parentLabel_ = parentNode.parentLabel;
        parentLevel_ = parentNode.parentLevel;
      }

    }
    /**constructor Model*/
    const doc: ICategoryModel = {
      _id: categoryID_,
      label: node.label,

      type: 'category',
      nodeType: node.nodeType,
      level: level_,
      status: node.status,
      display: node.display,
      description: description_,
      highlight: node.highlight,
      nodes: nodes_,
      icon: icon_,
      products: 0,
      metadata: {
        createDate: update,
        lastUpdate: update,
      },
      rootID: rootID_,
      rootLabel: rootLabel_,
      parentID: parentID_,
      parentLabel: parentLabel_,
      parentLevel: parentLevel_,
    }
    // console.log(doc);
    return doc;
  }
  validationCategoryData(categoryData: any): { status: boolean, message?: string } {
    const result = {
      status: true,
      message: 'Categoria Valida'
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
    return result

  }
  // #endregion
  //#region - UTILS
  identifyNode(category: ICategoryModel): NodeType {
    if (category.level === 1) return 'root';
    if (category.level != 1) return 'child';
    throw new Error('No se ha identificado el tipo de nodo')
  }
  createView(desigDoc: any) {
    this.dbSvc.putDocument(desigDoc)
  }
  // #endregion
}
