const API_BASE = "http://localhost:3000/shapes";

const ShapesAPI = {
  getAllShapes: async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch shapes");
      return await res.json();
    } catch (err) {
      console.error("getAllShapes error:", err);
      throw err;
    }
  },
};

export default ShapesAPI;