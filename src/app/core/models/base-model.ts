export class BaseModel {
  id: string;
  createdAt?: Date;
  updatedAt?: Date | null = null;

  constructor () {
    this.id = ''
  }
}
