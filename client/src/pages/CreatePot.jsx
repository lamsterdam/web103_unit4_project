import React, { useEffect, useState } from 'react'
import PotsAPI from "../services/PotsAPI";
import ExteriorsAPI from "../services/ExteriorsAPI";
import ShapesAPI from "../services/ShapesAPI";
import MaterialsAPI from "../services/MaterialsAPI";
import DrainagesAPI from "../services/DrainagesAPI";
import '../App.css'
import '../css/CreatePot.css'

const CreatePot = ({ title }) => {
    // Page title
    useEffect(() => {
        document.title = title;
    }, [title]);

    // Pot name input
    const [potName, setPotName] = useState("");

    // Options from API
    const [exteriors, setExteriors] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [drainages, setDrainages] = useState([]);

    // Selected options
    const [selectedExterior, setSelectedExterior] = useState(null);
    const [selectedShape, setSelectedShape] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedDrainage, setSelectedDrainage] = useState(null);

    // Which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null);

    // Fetch all options on mount
    useEffect(() => {
        const fetchData = async () => {
        try {
            setExteriors(await ExteriorsAPI.getAllExteriors());
            setShapes(await ShapesAPI.getAllShapes());
            setMaterials(await MaterialsAPI.getAllMaterials());
            setDrainages(await DrainagesAPI.getAllDrainages());
        } catch (err) {
            console.error("Error fetching options:", err);
        }
        };
        fetchData();
    }, []);

    // Create pot
    const handleCreatePot = async () => {
        if (!potName || !selectedExterior || !selectedShape || !selectedMaterial || !selectedDrainage) {
        alert("Please enter a name and select all options!");
        return;
        }

        try {
        await PotsAPI.createPot({
            name: potName,
            exterior_id: selectedExterior.exterior_id,
            shape_id: selectedShape.shape_id,
            material_id: selectedMaterial.material_id,
            drainage_id: selectedDrainage.drainage_id,
        });
        alert("Pot created successfully!");
        // reset
        setPotName("");
        setSelectedExterior(null);
        setSelectedShape(null);
        setSelectedMaterial(null);
        setSelectedDrainage(null);
        } catch (err) {
        console.error(err);
        alert("Failed to create pot.");
        }
    };

    // Helper to render a dropdown grid for a category
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

    return (
        <div className="create-pot-page">
            <h2>Create Your Custom Plant Pot</h2>

            <div className="pot-name-input">
                <label>Pot Name: </label>
                <input
                type="text"
                value={potName}
                onChange={(e) => setPotName(e.target.value)}
                placeholder="Enter pot name"
                />
            </div>

            {renderDropdown("Exterior", exteriors, selectedExterior, setSelectedExterior, "exterior_id")}
            {renderDropdown("Shape", shapes, selectedShape, setSelectedShape, "shape_id")}
            {renderDropdown("Material", materials, selectedMaterial, setSelectedMaterial, "material_id")}
            {renderDropdown("Drainage", drainages, selectedDrainage, setSelectedDrainage, "drainage_id")}

            <button className="create-pot-button" onClick={handleCreatePot}>
                Create Pot
            </button>

        </div>
    )
}

export default CreatePot