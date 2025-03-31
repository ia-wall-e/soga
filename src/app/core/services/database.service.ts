import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private baseURL: string = "http://127.0.0.1:5984/";
  private params = {
    auth: {
      username: 'ia-wall-e',
      password: 'hers137137'
    }
  };
  private db?: PouchDB.Database;
  constructor() { }
  connectDataBase(dbName: string) {
    this.db = new PouchDB(`${this.baseURL}${dbName}`, this.params);
  }
  //#update
  updateDocument(){
    
  }
  // #put
  putDocument(doc: any, params?: any): Promise<any> | undefined {
    if (params) { return this.db?.put(doc, params); } else { return this.db?.put(doc); }
  }
  //#post
  postDocument(doc: any) {
    this.db?.post(doc);
  }
  //#get
  async getDocuments(): Promise<any> {
    return this.db?.allDocs({ include_docs: true });
  }
  getDocument(id:string){
    return this.db?.get(id)
  }
  getDocsByViews(desigDoc: any) {
    return this.db?.put(desigDoc)
  }
  getByQuery(patch: string) {
    return this.db?.query(patch, {})
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.statusCode === 404 || error.status === 404) {
          console.warn('No se encontraron documentos (404)');
          // return { rows: [] };
          return null;
        } else {
          console.error('Error al consultar CouchDB:', error.message);
          throw error;
        }
      });
  }
}
