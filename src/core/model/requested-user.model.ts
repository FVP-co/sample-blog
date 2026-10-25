export class RequestedUserModel {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  id!: string;
  name!: string;

  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  exp!: string;
  iat!: string;
}
