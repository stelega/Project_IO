export interface Context {
  token: string | undefined;
  isAdmin: boolean | undefined;
}

const UserContext = (function () {
  let context: Context = {
    token: undefined,
    isAdmin: undefined,
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

  return {
    setContext: setContext,
    getToken: getToken,
    isAdmin: isAdmin,
  };
})();

export default UserContext;
