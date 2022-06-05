import { BaseModel } from "./base-model";

export class User extends BaseModel {
  name: string;
  email: string;
  crm: string;
  phone: string;
  password?: string;

  constructor() {
    super();
    this.name = '';
    this.email = '';
    this.crm = '';
    this.phone = '';
  }
}
