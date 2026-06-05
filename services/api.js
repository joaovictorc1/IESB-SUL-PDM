const BASE_URL = "http://localhost:3000";

export const api = {
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/categories`);
    return res.json();
  },
  
  createCategory: async (data) => {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getTransactions: async () => {
    const res = await fetch(`${BASE_URL}/transactions`);
    return res.json();
  },
  
  createTransaction: async (data) => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteTransaction: async (id) => {
    await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
  }
};