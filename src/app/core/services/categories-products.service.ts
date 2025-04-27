import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ICategoryData } from 'src/app/features/private/categories/utils/category-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesProductsService {
  private categorySource = new BehaviorSubject<any>(null);
  categorySource$ = this.categorySource.asObservable();
  constructor(private dbSvc: DatabaseService) {
    this.dbSvc.connectDataBase('categories-products')
  }
  //#Crud
  putRoot(data: any) {
    const date = new Date().toISOString();
    const update = { _id: data.name, date: date, type: 'create', user: 'admin-1233', info: null };
    if (data === "") throw new Error("Ingresa una categoria");
    const doc = {
      _id: `root:${data.name}`,
      label: data.name,
      description: data.description || null,
      type: 'category',
      level: 1,
      nodes: 0,
      status: data.status,
      display: data.display,
      products: 0,
      icon: data.icon,
      metadata: {
        createDate: update,
        lastUpdate: update,
      }
    }
    this.dbSvc.putDocument(doc);
  }
  putNode(data: any, categoryData:ICategoryData) {
    try {
      console.log(categoryData);
      if (!categoryData.parentID) throw new Error("Se ha presentado un problema con el parent del nodo")
      if (!categoryData.parentLevel) throw new Error("Se ha producido un error con los niveles del nodo");
      const date = new Date().toISOString();
      const update = { _id: data.name, date: date, type: 'create', user: 'admin-1233', info: null };
      let parentLevel = categoryData.parentLevel+1;
      console.log(parentLevel)
      const doc = {
        _id: `node:${data.id}`,
        type: 'category',
        level: parentLevel,
        label: data.name,
        nodes: 0,
        status: data.status,
        description: data.description,
        parent_id: categoryData.parentID,
        metadata: {
          createDate: update,
          lastUpdate: update,
        }
      }
      this.dbSvc.putDocument(doc)
    } catch (e) { console.error(e) }

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
  //#design
  createQuery(desigDoc: any) {
    this.dbSvc.getDocsByViews(desigDoc)
      ?.then(r => console.log(r))
      .catch(e => console.log(e))
  }

}
