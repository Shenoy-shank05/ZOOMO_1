const API_BASE = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

async function handleResponse(res) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch (err) {
    console.error("Invalid JSON from backend:", text);
    return {};
  }
}

export const api = {
  // GET
  get: async (url) => {
    const token = getToken();
    const res = await fetch(API_BASE + url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleResponse(res);
  },

  // POST
  post: async (url, body = {}) => {
    const token = getToken();
    const res = await fetch(API_BASE + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  // PATCH
  patch: async (url, body = {}) => {
    const token = getToken();
    const res = await fetch(API_BASE + url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  // DELETE
  delete: async (url) => {
    const token = getToken();
    const res = await fetch(API_BASE + url, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return handleResponse(res);
  },
};
