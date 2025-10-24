import { pool } from '../config/database.js'

//controller function to perform operation on pots table

//get the pots table
const getPots = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM pots ORDER BY pot_id ASC')
        res.status(200).json(results.rows)
    } catch (err) {
        res.status(409).json( {error: err.message} )
    }
}

//get the pot by pot_id
const getPotById = async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM pots WHERE pot_id=$1`

        // extract the pot_id
        const potId = req.params.id

        // query db to get the pot with matching potId
        const results = await pool.query(selectQuery, [potId])
        res.status(200).json(results.rows[0])
    } catch (err) {
        res.status(409).json( {error: err.message} )
    }
}

//function to edit or modify an existing pot
const editPotById = async (req, res) => {
    // get the target id from route params
    const potId = parseInt(req.params.id)

    // get the data that we want to update from the request body
    // use object destructuring to get the fields that are present
    const { name, exterior_id, shape_id, drainage_id, material_id } = req.body

    // dynamic query construction
    // PATCH allows partial updates so we must build the SQL query dynamically

    const updates = [] // updates
    const values = [] // values coming in

    // validate the inputs
    // set paramCount to 1, it will always be at least 1
    // check if name is not undefined and if so we increment paramCount and add name = new paramCount to updates array and add name to values array
    let paramCount = 1
    if (name !== undefined) {
        updates.push(`name = $${paramCount++}`)
        values.push(name)
    }

    if (exterior_id !== undefined) {
        updates.push(`exterior_id = $${paramCount++}`)
        values.push(parseInt(exterior_id))
    }

    if (shape_id !== undefined) {
        updates.push(`shape_id = $${paramCount++}`)
        values.push(parseInt(shape_id))
    }

    if (drainage_id !== undefined) {
        updates.push(`drainage_id = $${paramCount++}`)
        values.push(parseInt(drainage_id))
    }

    if (material_id !== undefined) {
        updates.push(`material_id = $${paramCount++}`)
        values.push(parseInt(material_id))
    }

    // check if the updates array is empty meaning no fields were provided to be changed
    if (updates.length === 0) {
        return res.status(400).send('Error: no valid fields provided')
    }

    // build out the query using UPDATE and update the pots table with updates array elements
    // updates is already an array of ["name = $1", "shape_id = $2", "material_id = $3"]
    // we convert to one string name = $1, shape_id = $2, material_id = $3 and this becomes the SET in the query
    // and updating the entire row (that pot) but only the columns listed to be changed in SET
    // paramCount is incremented as we move through each field, so by the end, it points to the next placeholder number
    // so $${paramCount} used for the WHERE condition which is the ID placeholder
    const sql = `
        UPDATE pots
        SET ${updates.join(', ')}
        WHERE pot_id = $${paramCount}
        RETURNING pot_id, name, exterior_id, shape_id, drainage_id, material_id
    `

    values.push(potId)

    try {
        // execute the query
        const result = await pool.query(sql, values)

        // check if any row was updated
        if (result.rowCount === 0) {
            return res.status(404).send(`Pots with ID ${potId} not found`)
        }

        // respond with the updated student record
        res.json({
            message: `Pot ID ${potId} successfully updated!`,
            pot: result.rows[0]
        })
    } catch (err) {
        console.error('PostgreSQL Update Error:', err.message)
        res.status(500).send('Server Error: Failed to update pot data')
    }

}

// function to delete a pot
const deletePotById = async (req, res) => {
    // get the potId from route params
    const potId = parseInt(req.params.id)

    const sql = 'DELETE FROM pots WHERE pot_id=$1 RETURNING *'
    const values = [potId]


    try {
        const result = await pool.query(sql, values)
        if (result.rowCount === 0) {
            return res.status(404).send(`Pot with ID ${potId} not found`)
        }
        res.json({ message: `Pot ID ${potId} deleted successfully!` })
    } catch (err) {
        console.error('PostgreSQL Deletion Error:', err.message)
        res.status(500).send('Server Error: Failed to delete pot data')
    }
}

// function to create a pot
const createPot = async (req, res) => {
    const { name, exterior_id, shape_id, drainage_id, material_id } = req.body

    // validate the input has all the required parts to make a pot
    if (!name || !exterior_id || !shape_id || !drainage_id || !material_id) {
        return res.status(400).send('Error: Name, exterior_id, shape_id, drainage_id and material_id are required')
    }

    // the pg library automatically sanitizes data in the values array
    // this prevents malicious data from corrupting or exposing the database
    // so if doing an insert in javaScript can do it this way

    // SQL Inject safe parametrized query
    const sql = 'INSERT INTO pots (name, exterior_id, shape_id, drainage_id, material_id) VALUES ($1, $2, $3, $4, $5) RETURNING pot_id'
    const values = [name, parseInt(exterior_id), parseInt(shape_id), parseInt(drainage_id), parseInt(material_id)]

    try {
        // execute the query using the connection pool
        const result = await pool.query(sql, values)
        const newPotId = result.rows[0].pot_id // get the ID back from returning id

        // respond with success
        res.status(201).json({
            message: 'Pot record successfully created!',
            id: newPotId,
            pot: {name, exterior_id, shape_id, drainage_id, material_id}
        })
    } catch (err) {
        // log databse error for debugging
        console.error('PostgreSQL Insertion Error:', err.message)
        res.status(500).send('Server Error: Failed to save pot data to the database')
    }
}


export default {
    getPots, 
    getPotById,
    editPotById,
    deletePotById,
    createPot
}