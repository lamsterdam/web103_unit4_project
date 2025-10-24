const API_BASE = "http://localhost:3000/drainages";

const DrainagesAPI = {
  getAllDrainages: async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch drainages");
      return await res.json();
    } catch (err) {
      console.error("getAllDrainages error:", err);
      throw err;
    }
  },
};

export default DrainagesAPI;