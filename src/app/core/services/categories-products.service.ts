import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs'
import { ICategoryModel, NodeType } from '../interface/category-model';
import { FormGroup, NgControlStatusGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CategoriesProductsService {
  constructor(private dbSvc: DatabaseService) {
    this.dbSvc.connectDataBase('categories-products-staging')
  }
  //#region - CRUD
  createNode(formData: any, parentNode?: ICategoryModel | null): Promise<any> | undefined {
    const doc: ICategoryModel = this.builderCategoryModel(formData, parentNode);
    // console.log(doc)
    return this.saveNode(doc);
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
  private saveNode(doc: ICategoryModel): Promise<any> | undefined {
    return this.dbSvc.putDocument(doc);
  }
  private handlerResponse(r: any) {
    // console.log(r.rows);
    return r.rows;
  }
  //#endregion
  //#region - CONSTRUCTOR OBJECTO MODEL CATEGORY
 private builderCategoryModel(form: any, parentNode?: ICategoryModel | null): ICategoryModel {
    if (form instanceof FormGroup) {
      // 1.valdacion del formulario
      const validation = this.validationCategoryData(form.value)
      if (!validation.status) throw new Error(`ERROR: ${validation.message}`);
      // 2.crear objeto CategoryModel
      const categoryObj = this.createCategoryModel(form, parentNode);
      // console.log(categoryObj);
      return categoryObj;
    }
    throw new Error('El parámetro data no es una instancia de FormGroup');
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
  /** Constructor del modelo de Categoria */
  createCategoryModel(formData: FormGroup, parentNode?: ICategoryModel | null): ICategoryModel {
    const node = formData.value;
    const now = new Date().toISOString();
    const updateMeta = {
      _id: node.label,
      date: now,
      type: 'create',
      user: 'admin-1233',
      info: null
    };
    const baseDoc = node.nodeType === 'root'
      ? this.buildRootNode(node)
      : this.buildChildNode(node, parentNode);
    return {
      ...baseDoc,
      metadata: {
        createDate: updateMeta,
        lastUpdate: updateMeta
      }
    };
  }
  private buildRootNode(node: any): any {
    const icon = node.icon || 'bookmark-outline';
    return {
      _id: `${node.nodeType}:${node.id}`,
      label: node.label,
      type: 'category',
      nodeType: node.nodeType,
      level: 1,
      status: node.status,
      display: node.display,
      description: node.description,
      highlight: node.highlight,
      childNodes: null,
      icon,
      products: 0
    };
  }
  private buildChildNode(node: any, parentNode?: ICategoryModel | null): any {
    // console.log(node);
    // console.log(parentNode);
    if (!parentNode) {
      throw new Error('Se presentó un problema al crear esta subcategoría');
    }
    const icon = ():string=>{return node.icon || (node.nodeType === 'child' ? 'git-commit-outline' : 'leaf-outline')};
    const isRootParent = parentNode.nodeType === 'root';
    const rootID = isRootParent ? parentNode._id : parentNode.rootID!;
    const rootLabel = isRootParent ? parentNode.label : parentNode.rootLabel!;
    const parentID = parentNode._id;
    const parentLabel = parentNode.label;
    const parentLevel = parentNode.level;
    const level = parentLevel + 1;
    // console.log( `${node.nodeType}:${node.id}`)
    const document = {
      _id: `${node.nodeType}:${node.id}`,
      label: node.label,
      type: 'category',
      nodeType: node.nodeType,
      level,
      status: node.status,
      display: node.display,
      description: node.description,
      highlight: node.highlight,
      childNodes: node.nodes || [],
      icon:icon(),
      products: 0,
      rootID,
      rootLabel,
      parentID,
      parentLabel,
      parentLevel
    };
    // console.log(document)
    return document;
  }
  // #endregion
  //#region - UTILS
  // identifyNode(category: ICategoryModel): NodeType {
  //   if (category.level === 1) return 'root';
  //   if (category.level != 1) return 'child';
  //   throw new Error('No se ha identificado el tipo de nodo')
  // }
  createView(desigDoc: any) {
    this.dbSvc.putDocument(desigDoc)
  }
  // #endregion

}

