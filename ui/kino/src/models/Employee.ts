export interface NewEmployee {
  name: string;
  surname: string;
  login: string;
  isAdmin: boolean;
  password: string;
}

export interface Employee extends NewEmployee {
  employeeId: string;
  name: string;
  surname: string;
  login: string;
  isAdmin: boolean;
}
