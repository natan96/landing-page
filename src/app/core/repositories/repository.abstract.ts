import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseModel } from "../models/base-model";

export abstract class RepositoryAbstract<T extends BaseModel> {
  constructor(protected repository: string, protected http: HttpClient) {}

  public add(data: T): Promise<T> {
    data.createdAt = new Date();
    return lastValueFrom(this.http.post<T>(`${environment.urlApi}${this.repository}`, data).pipe(
      map(result => this.dateObject(result))
    ));
  }

  public get(id: string): Promise<T> {
    return lastValueFrom(this.http.get<T>(`${environment.urlApi}${this.repository}/${id}`).pipe(
      map(result => this.dateObject(result))
    ));
  }

  public list(): Promise<T[]> {
    return lastValueFrom(this.http.get<T[]>(`${environment.urlApi}${this.repository}`).pipe(
      map(result => result.map(res => this.dateObject(res)))
    ));
  }

  private dateObject(data: any): T {
    const obj = {...data};
    if (obj?.createdAt) {
      obj.createdAt = new Date(obj.createdAt);
    }
    if (obj?.updatedAt) {
      obj.updatedAt = new Date(obj.updatedAt);
    }
    return obj;
  }
}
