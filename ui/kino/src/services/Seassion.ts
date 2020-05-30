export interface Context {
  token: string | undefined;
  isAdmin: boolean | undefined;
  name: string | undefined;
  surname: string | undefined;
}

const UserContext = (function () {
  let context: Context = {
    token: undefined,
    isAdmin: undefined,
    name: undefined,
    surname: undefined,
  };

  const getToken = (): string | undefined => {
    return context.token;
  };

  const setContext = (cont: Context): void => {
    context = cont;
  };

  const isAdmin = (): Boolean | undefined => {
    return context.isAdmin;
  };

  const isLogged = (): Boolean => {
    return context.token ? true : false;
  };

  const logOut = () => {
    context.token = undefined;
    context.isAdmin = undefined;
    context.name = undefined;
    context.surname = undefined;
  };

  return {
    setContext: setContext,
    getToken: getToken,
    isAdmin: isAdmin,
    isLoggedIn: isLogged,
    logOut: logOut,
  };
})();

export default UserContext;
