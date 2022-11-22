const BASE_URL = 'https://api.mesto-softlolx.nomoredomains.club';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Упс, да у вас тут ${res.status}`);
  }
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function logout() {
  const res = await fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  });
  if (res.ok) {
    return await res.json();
  }
  return handleResponse(res);
}

export async function getContent() {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return handleResponse(res);
}
