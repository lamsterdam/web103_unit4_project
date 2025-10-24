const API_BASE = "http://localhost:3000/exteriors";

const ExteriorsAPI = {
  getAllExteriors: async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch exteriors");
      return await res.json();
    } catch (err) {
      console.error("getAllExteriors error:", err);
      throw err;
    }
  },
};

export default ExteriorsAPI;