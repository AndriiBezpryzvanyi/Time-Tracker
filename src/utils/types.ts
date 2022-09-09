interface IGeo {
  lat: number;
  lng: number;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IComment {
  id: number;
  date: Date;
  text: string;
}

export interface ITask {
  name: string;
  description?: string;
  dateTimeFrom: Date | string;
  dateTimeTo: Date | string;
  user: IUser;
  isFavorite?: boolean;
  comments?: IComment[];
}
