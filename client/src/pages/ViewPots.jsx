import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PotsAPI from '../services/PotsAPI';
import ExteriorsAPI from '../services/ExteriorsAPI';
import ShapesAPI from '../services/ShapesAPI';
import MaterialsAPI from '../services/MaterialsAPI';
import DrainagesAPI from '../services/DrainagesAPI';
import { calculateTotalPrice } from "../utilities/calcPrice";
import '../css/ViewPots.css'
import '../App.css'

const ViewPots = () => {
    const [pots, setPots] = useState([]);
    const [exteriors, setExteriors] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [drainages, setDrainages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [potsData, exteriorsData, shapesData, materialsData, drainagesData] = await Promise.all([
                PotsAPI.getAllPots(),
                ExteriorsAPI.getAllExteriors(),
                ShapesAPI.getAllShapes(),
                MaterialsAPI.getAllMaterials(),
                DrainagesAPI.getAllDrainages(),
            ]);
            setPots(potsData);
            setExteriors(exteriorsData);
            setShapes(shapesData);
            setMaterials(materialsData);
            setDrainages(drainagesData);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
        };
        fetchData();
    }, []);

    // Helper to find the related option by ID
    const findOption = (options, id, idKey = null) => {
        if (!id) return null;
        return options.find(opt => opt[idKey || `${Object.keys(opt)[0]}_id`] === id);
    };
    
    return (
         <div className="view-pots-page p-8">
            <h2 className="text-2xl font-semibold mb-4">All Pots</h2>
            <div className="pots-grid">
            {pots.map(pot => {
                const exterior = findOption(exteriors, pot.exterior_id, 'exterior_id');
                const shape = findOption(shapes, pot.shape_id, 'shape_id');
                const material = findOption(materials, pot.material_id, 'material_id');
                const drainage = findOption(drainages, pot.drainage_id, 'drainage_id');

                const totalPrice = calculateTotalPrice({ exterior, shape, material, drainage });

                return (
                <div key={pot.pot_id} className="pot-card">
                    <h3 className="font-bold text-lg">{pot.name}</h3>
                    
                    {exterior && (
                    <div className="option">
                        <p>Exterior: {exterior.name}</p>
                        <p>Price: ${Number(exterior.price).toFixed(2)}</p>
                    </div>
                    )}

                    {shape && (
                    <div className="option">
                        <p>Shape: {shape.name}</p>
                        <p>Price: ${Number(shape.price).toFixed(2)}</p>
                    </div>
                    )}

                    {material && (
                    <div className="option">
                        <p>Material: {material.name}</p>
                        <p>Price: ${Number(material.price).toFixed(2)}</p>
                    </div>
                    )}

                    {drainage && (
                    <div className="option">
                        <p>Drainage: {drainage.name}</p>
                        <p>Price: ${Number(drainage.price).toFixed(2)}</p>
                    </div>
                    )}

                    <p>Total Price: ${totalPrice.toFixed(2)}</p>

                    <div className="buttons mt-2">
                    <button
                        onClick={() => navigate(`/pots/${pot.pot_id}`)}
                        className="text-blue-600 underline mr-4"
                    >
                        View Details
                    </button>
                    {/* <button
                        onClick={() => navigate(`/edit/${pot.pot_id}`)}
                        className="text-green-600 underline"
                    >
                        Edit
                    </button> */}
                    </div>
                </div>
                );
            })}
            </div>
    </div>
    )
}

export default ViewPots