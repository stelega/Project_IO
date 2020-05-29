interface LoginDto {
  login: string;
  password: string;
}

export async function apiLogin(login: string, password: string) {
  const body: LoginDto = {
    login: login,
    password: password,
  };
  const jsonBody = JSON.stringify(body);
  console.log(jsonBody);
  const responseJson = await fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonBody,
  });
  const response = await responseJson.json();
  console.log(response);
  return '';
}
