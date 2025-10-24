// service object for pots
const API_BASE = "http://localhost:3000/pots"; // backend route

const PotsAPI = {

    // function to get all pots
    getAllPots: async () => {
        try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch pots");
        return await res.json();
        } catch (err) {
        console.error("getAllPots error:", err);
        throw err;
        }
    },

    // function to get one pot
    getPot: async (id) => {
        try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch pot");
        return await res.json();
        } catch (err) {
        console.error("getPot error:", err);
        throw err;
        }
    },

    // function to create a pot
    createPot: async (potData) => {
        try {
        const res = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(potData),
        });
        if (!res.ok) throw new Error("Failed to create pot");
        return await res.json();
        } catch (err) {
        console.error("createPot error:", err);
        throw err;
        }
    },

    // function to update a pot
    updatePot: async (id, updatedData) => {
        try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        if (!res.ok) throw new Error("Failed to update pot");
        return await res.json();
        } catch (err) {
        console.error("updatePot error:", err);
        throw err;
        }
    },

    deletePot: async (id) => {
        try {
        const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete pot");
        return await res.json();
        } catch (err) {
        console.error("deletePot error:", err);
        throw err;
        }
    },
};

export default PotsAPI;