import Cookies from 'universal-cookie';

export interface Context {
  token: string | undefined;
  isAdmin: boolean | undefined;
  name: string | undefined;
  surname: string | undefined;
}

interface UserContext {
  setContext: (context: Context) => void;
  getToken: () => string | undefined;
  isAdmin: () => Boolean | undefined;
  isLoggedIn: () => Boolean;
  logOut: () => void;
  getName: () => string;
  getSurname: () => string;
}

const UserContext: UserContext = (() => {
  const cookies = new Cookies();

  const getToken = (): string | undefined => {
    const token = cookies.get('token');
    return token !== 'undefined' ? token : undefined;
  };

  const setContext = (context: Context): void => {
    cookies.set('token', context.token, { path: '/' });
    cookies.set('isAdmin', context.isAdmin, { path: '/' });
    cookies.set('name', context.name, { path: '/' });
    cookies.set('surname', context.surname, { path: '/' });
  };

  const isAdmin = (): Boolean | undefined => {
    const isAdmin = cookies.get('isAdmin');
    return isAdmin === 'true' ? true : false;
  };

  const isLogged = (): Boolean => {
    const token = cookies.get('token');
    return token !== 'undefined' ? true : false;
  };

  const logOut = () => {
    cookies.remove('token');
    cookies.remove('isAdmin');
    cookies.remove('name');
    cookies.remove('surname');
  };

  const getName = (): string => {
    const name = cookies.get('name');
    return name !== 'undefined' ? name : '';
  };

  const getSurname = (): string => {
    const surname = cookies.get('surname');
    return surname !== 'undefined' ? surname : '';
  };

  return {
    setContext: setContext,
    getToken: getToken,
    getName: getName,
    getSurname: getSurname,
    isAdmin: isAdmin,
    isLoggedIn: isLogged,
    logOut: logOut,
  };
})();

export default UserContext;
