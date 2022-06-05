import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private _user: UserRepository) {}

  async login(email: string, password: string): Promise<boolean> {
    return await this._user.list().then(list => {
      const user = list.find(user => user.email === email && user.password === password);
      if (user) {
        delete user.password;
        localStorage.setItem('@application/user', JSON.stringify(user));
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('@application/user');
  }

  getLoggedUser(): User | null {
    const stringify = localStorage.getItem('@application/user');
    return stringify ? this.dateUser(JSON.parse(stringify)) as User : null;
  }

  private dateUser(data: any) {
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
