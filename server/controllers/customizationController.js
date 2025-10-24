import { pool } from '../config/database.js'

//controller function to perform operation on the various customization tables

//get the exteriors table
const getExteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM exteriors ORDER BY exterior_id ASC')
        res.status(200).json(results.rows)
    } catch (err) {
        res.status(409).json( {error: err.message} )
    }
}

//get shapes table
const getShapes = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM shapes ORDER BY shape_id ASC');
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get materials table
const getMaterials = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM materials ORDER BY material_id ASC');
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get drainage table
const getDrainages = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM drainages ORDER BY drainage_id ASC');
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
    getExteriors,
    getShapes, 
    getMaterials, 
    getDrainages
}