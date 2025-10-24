const API_BASE = "http://localhost:3000/materials";

const MaterialsAPI = {
  getAllMaterials: async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch materials");
      return await res.json();
    } catch (err) {
      console.error("getAllMaterials error:", err);
      throw err;
    }
  },
};

export default MaterialsAPI;