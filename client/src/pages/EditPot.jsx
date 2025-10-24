import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import PotsAPI from "../services/PotsAPI";
import ExteriorsAPI from "../services/ExteriorsAPI";
import ShapesAPI from "../services/ShapesAPI";
import MaterialsAPI from "../services/MaterialsAPI";
import DrainagesAPI from "../services/DrainagesAPI";
import { calculateTotalPrice } from "../utilities/calcPrice";
import '../App.css'
import "../css/EditPot.css";

const EditPot = ({ title }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pot, setPot] = useState(null);

    const [exteriors, setExteriors] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [drainages, setDrainages] = useState([]);

    const [selectedExterior, setSelectedExterior] = useState(null);
    const [selectedShape, setSelectedShape] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedDrainage, setSelectedDrainage] = useState(null);

    const [openDropdown, setOpenDropdown] = useState(null);

    // fetch pot and options
    useEffect(() => {
        document.title = title;

        const fetchData = async () => {
        try {
            const data = await PotsAPI.getPot(id);
            setPot(data);

            const [exts, shps, mats, drns] = await Promise.all([
            ExteriorsAPI.getAllExteriors(),
            ShapesAPI.getAllShapes(),
            MaterialsAPI.getAllMaterials(),
            DrainagesAPI.getAllDrainages()
            ]);

            setExteriors(exts);
            setShapes(shps);
            setMaterials(mats);
            setDrainages(drns);

            // set selected based on pot
            setSelectedExterior(exts.find(e => e.exterior_id === data.exterior_id));
            setSelectedShape(shps.find(s => s.shape_id === data.shape_id));
            setSelectedMaterial(mats.find(m => m.material_id === data.material_id));
            setSelectedDrainage(drns.find(d => d.drainage_id === data.drainage_id));

        } catch (err) {
            console.error(err);
        }
        };

        fetchData();
    }, [id, title]);

    if (!pot) return <p>Loading Up Pot...</p>;

    const renderDropdown = (title, options, selected, setSelected, idKey) => (
        <div className="dropdown-category">
            <h3
                className="dropdown-title"
                onClick={() => setOpenDropdown(openDropdown === title ? null : title)}
            >
                {title} {selected ? `- Selected: ${selected.name}` : ""}
            </h3>

            {openDropdown === title && (
                <div className="grid">
                {options.map(opt => (
                    <div
                    key={opt[idKey]}
                    className={`card ${selected?.[idKey] === opt[idKey] ? "selected" : ""}`}
                    onClick={() => setSelected(opt)}
                    >
                    {opt.image && <img src={opt.image} alt={opt.name} />}
                    <p>{opt.name}</p>
                    <p>${opt.price ? Number(opt.price).toFixed(2) : "N/A"}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
    // Handlers
    const handleUpdate = async () => {
        try {
        await PotsAPI.updatePot(id, {
            name: pot.name,
            exterior_id: selectedExterior.exterior_id,
            shape_id: selectedShape.shape_id,
            material_id: selectedMaterial.material_id,
            drainage_id: selectedDrainage.drainage_id,
        });
        alert("Pot updated successfully!");
        navigate(`/pots/${id}`);
        } catch (err) {
        console.error(err);
        alert("Failed to update pot.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this pot?")) return;

        try {
        await PotsAPI.deletePot(id);
        alert("Pot deleted successfully!");
        navigate("/pots");
        } catch (err) {
        console.error(err);
        alert("Failed to delete pot.");
        }
    };

    const totalPrice = calculateTotalPrice({
        exterior: selectedExterior,
        shape: selectedShape,
        material: selectedMaterial,
        drainage: selectedDrainage,
    });
    return (
        <div className="edit-pot-page">
            <h2>Edit Pot</h2>

            <div className="dropdowns">
                {renderDropdown("Exterior", exteriors, selectedExterior, setSelectedExterior, "exterior_id")}
                {renderDropdown("Shape", shapes, selectedShape, setSelectedShape, "shape_id")}
                {renderDropdown("Material", materials, selectedMaterial, setSelectedMaterial, "material_id")}
                {renderDropdown("Drainage", drainages, selectedDrainage, setSelectedDrainage, "drainage_id")}
            </div>

            <div className="pot-details-container">
                <div className="left-column">
                <h2>{pot.name}</h2>
                <p>
                    Total Price: ${totalPrice ? totalPrice.toFixed(2) : "0.00"}
                </p>
                <div className="buttons mt-4">
                    <button className="edit-btn" onClick={handleUpdate}>
                    Update
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>
                    Delete
                    </button>
                </div>
                </div>

                <div className="right-column">
                {[selectedExterior, selectedShape, selectedMaterial, selectedDrainage].map(
                    (item, index) =>
                    item && (
                        <div key={index} className="option-grid">
                        {item.image && <img src={item.image} alt={item.name} />}
                        <p>{item.name}</p>
                        <p>${item.price ? Number(item.price).toFixed(2) : "N/A"}</p>
                        </div>
                    )
                )}
                </div>
            </div>
        </div>
    )
}

export default EditPot