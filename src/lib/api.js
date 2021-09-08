import { FIREBASE_DOMAIN, SIGN_UP_URL, SIGN_IN_URL } from "../configuration";

export async function getAllProducts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/shop.json`);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "could not fetch");

  const productData = [];

  for (const key in data) {
    const productObj = {
      id: key,
      ...data[key],
    };
    productData.push(productObj);
  }

  return productData;
}

export async function uploadProduct(productObj) {
  const response = await fetch(`${FIREBASE_DOMAIN}/shop.json`, {
    method: "POST",
    body: JSON.stringify(productObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "could not upload");

  return null;
}

export async function deleteProduct(productId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/shop/${productId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Delete Failed");

  return null;
}

//POST, body:email: string, password: string, returnSecureToken = true
export async function sign(userData) {
  const url = userData.SignIn ? SIGN_IN_URL : SIGN_UP_URL;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed");

  return data;
}
