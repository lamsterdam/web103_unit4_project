import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import PotsAPI from "../services/PotsAPI";
import ExteriorsAPI from "../services/ExteriorsAPI";
import ShapesAPI from "../services/ShapesAPI";
import MaterialsAPI from "../services/MaterialsAPI";
import DrainagesAPI from "../services/DrainagesAPI";
import { calculateTotalPrice } from "../utilities/calcPrice";
import '../App.css'
import "../css/PotDetails.css";

const PotDetails = ({ title }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pot, setPot] = useState(null);
    const [exteriors, setExteriors] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [drainages, setDrainages] = useState([]);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await PotsAPI.getPot(id);
            setPot(data);

            setExteriors(await ExteriorsAPI.getAllExteriors());
            setShapes(await ShapesAPI.getAllShapes());
            setMaterials(await MaterialsAPI.getAllMaterials());
            setDrainages(await DrainagesAPI.getAllDrainages());
        } catch (err) {
            console.error(err);
        }
        };
        fetchData();
    }, [id]);

    const findOption = (options, id, key) =>
        options.find((opt) => opt[key] === id);

    if (!pot) return <p>Loading...</p>;

    const exterior = findOption(exteriors, pot.exterior_id, "exterior_id");
    const shape = findOption(shapes, pot.shape_id, "shape_id");
    const material = findOption(materials, pot.material_id, "material_id");
    const drainage = findOption(drainages, pot.drainage_id, "drainage_id");

    const totalPrice = calculateTotalPrice({ exterior, shape, material, drainage });

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this pot?")) return;

        try {
            await PotsAPI.deletePot(pot.pot_id);
            alert("Pot deleted successfully!");
            navigate("/view-pots"); // redirect to list after deletion
        } catch (err) {
            console.error("Failed to delete pot:", err);
            alert("Failed to delete pot.");
        }
    };

    return (
        <div className="pot-details-page">
            <div className="pot-details-container">
                <div className="left-column">
                <h2>{pot.name}</h2>
                
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <div className="buttons mt-4">
                    <button onClick={() => navigate(`/edit/${pot.pot_id}`)}
                        className="edit-btn">
                            Edit
                    </button>
                    <button onClick={handleDelete}
                        className="delete-btn">
                            Delete
                    </button>
                </div>
                </div>

                <div className="right-column">
                {[exterior, shape, material, drainage].map((item, index) => (
                    item && (
                    <div key={index} className="option-grid">
                        {item.image && <img src={item.image} alt={item.name} />}
                        <p>{item.name}</p>
                        <p>${item.price ? Number(item.price).toFixed(2) : "N/A"}</p>
                    </div>
                    )
                ))}
                </div>
            </div>
        </div>
    )
}

export default PotDetails