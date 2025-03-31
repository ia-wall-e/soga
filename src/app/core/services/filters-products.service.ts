import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable, from } from 'rxjs';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class FiltersProductsService {
  // private db: PouchDB.Database;
  constructor(private dbSvc :DatabaseService) {
    // this.db= this.dbSvc.connectDataBase('filters-products')
  }

  //# Método que devuelve un Observable
  // createDocument(doc: any): Observable<any> {
    // console.log(doc)
    // const promise = this.db.put(doc);
    // return from(promise); // Convierte la Promise en un Observable
  // }
}
