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
  //#get
  getDocument(id: string) {
    return this.db?.get(id)
  }
  getByEndpoint(endpoint: string, options?: PouchDB.Query.Options<any, any>): Promise<any | null> {
    const db = this.connectionManager(this.db);
    return db.query(endpoint, options)
      .then((response: any) => {
        // console.log(response);
        return response;
      })
      .catch((error: any) => {
        if (error.statusCode === 404 || error.status === 404) {
            throw new Error(`El punto de conexion "${endpoint}" esta presentando problemas .`);
        } else {
          console.error('Error al consultar la base de datos:', error.message);
          throw error;
        }
      });
  }
  //#put
  putDocument(doc: any, params?: any): Promise<any> | undefined {
    if (params) { return this.db?.put(doc, params); } else { return this.db?.put(doc); }
  }
  //#post
  postDocument(doc: any) {
    this.db?.post(doc);
  }
  //#utils
  connectionManager(database: any) {
    if (!database) {
      return Promise.reject(new Error('La base de datos no está inicializada.'));
    }
    return database;
  }

}
