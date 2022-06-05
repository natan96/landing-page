import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RepositoryEnum } from "../enums/repository.enum";
import { User } from "../models/user";
import { RepositoryAbstract } from "./repository.abstract";

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends RepositoryAbstract<User> {
  constructor(http: HttpClient) {
    super(RepositoryEnum.USERS, http);
  }

  async emailUsed(email: string): Promise<boolean> {
    let used = false;
    await this.list().then(list => {
      used = list.find(u => u.email === email) ? true : false;
    });
    return used;
  }

  async crmUsed(crm: string): Promise<boolean> {
    let used = false;
    await this.list().then(list => {
      used = list.find(u => u.crm === crm) ? true : false;
    });
    return used;
  }
}
