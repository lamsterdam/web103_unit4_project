import {pool} from './database.js'
import './dotenv.js'
import { potData, exteriorData, shapeData, drainageData, materialData } from '../data/plantPotData.js'
import { Query } from 'pg'

// table containing the foreign key is the child table and the table to which it refers is the parent table
// using the pot table as the child and it has multiple foreign keys in multiple parent tables (exterior, shape, drainage, material)

// function to drop tables in correct order rather than cascade
const dropTables = async() => {
    try {
        await pool.query(`DROP TABLE IF EXISTS pots`)
        await pool.query(`DROP TABLE IF EXISTS exteriors`)
        await pool.query(`DROP TABLE IF EXISTS shapes`)
        await pool.query(`DROP TABLE IF EXISTS drainages`)
        await pool.query(`DROP TABLE IF EXISTS materials`)
        console.log('🎉 tables dropped successfully')
    } catch (err) {
        console.error('⚠️ error dropping tables', err)
    }
}

// function to create exteriors table
// create a query to create the table with the fields in the table and use connection pool to send the query to the db
const createExteriorsTable = async() => {
    const createExteriorsTableQuery = `
        CREATE TABLE IF NOT EXISTS exteriors (
            exterior_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )
    `

    // use the pool connection to query the database with the query
    try {
        const res = await pool.query(createExteriorsTableQuery)
        console.log('🎉 exteriors table created successfully')
    } catch (err) {
        console.error('⚠️ error creating exteriors table', err)
    }
}

// load the data from exterior data array into the db table
const seedExteriorsTable = async() => {
    for (const exterior of exteriorData) {
        const insertQuery = {
            text: 'INSERT INTO exteriors (name, image, price) VALUES ($1, $2, $3)'
        }

        // destructure the exterior into its parts and place in values array
        const values = [
            exterior.name,
            exterior.image,
            exterior.price
        ]

        // use the pool connection to make a query to the db to insert the exterior
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting exterior', err)
                return
            }
            console.log(`✅ ${exterior.name} added successfully`)
        })
    }
}

// function to create shapes table
const createShapesTable = async() => {
    const createShapesTableQuery = `
        CREATE TABLE IF NOT EXISTS shapes (
            shape_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )
    `

    // use the pool connection to query the database with the query
    try {
        const res = await pool.query(createShapesTableQuery)
        console.log('🎉 shapes table created successfully')
    } catch (err) {
        console.error('⚠️ error creating shapes table', err)
    }
}

// load the data from shape data array into the db table
const seedShapesTable = async() => {
    for (const shape of shapeData) {
        const insertQuery = {
            text: 'INSERT INTO shapes (name, image, price) VALUES ($1, $2, $3)'
        }

        // destructure the shape into its parts and place in values array
        const values = [
            shape.name,
            shape.image,
            shape.price
        ]

        // use the pool connection to make a query to the db to insert the shape
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting shape', err)
                return
            }
            console.log(`✅ ${shape.name} added successfully`)
        })
    }
}

// function to create drainages table
const createDrainagesTable = async() => {
    const createDrainagesTableQuery = `
        CREATE TABLE IF NOT EXISTS drainages (
            drainage_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )
    `

    // use the pool connection to query the database with the query
    try {
        const res = await pool.query(createDrainagesTableQuery)
        console.log('🎉 drainages table created successfully')
    } catch (err) {
        console.error('⚠️ error creating drainages table', err)
    }
}

// load the data from drainage data array into the db table
const seedDrainagesTable = async() => {
    for (const drainage of drainageData) {
        const insertQuery = {
            text: 'INSERT INTO drainages (name, image, price) VALUES ($1, $2, $3)'
        }

        // destructure the drainage into its parts and place in values array
        const values = [
            drainage.name,
            drainage.image,
            drainage.price
        ]

        // use the pool connection to make a query to the db to insert the drainage
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting drainage', err)
                return
            }
            console.log(`✅ ${drainage.name} added successfully`)
        })
    }
}

// function to create materials table
const createMaterialsTable = async() => {
    const createMaterialsTableQuery = `
        CREATE TABLE IF NOT EXISTS materials (
            material_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )
    `

    // use the pool connection to query the database with the query
    try {
        const res = await pool.query(createMaterialsTableQuery)
        console.log('🎉 materials table created successfully')
    } catch (err) {
        console.error('⚠️ error creating materials table', err)
    }
}

// load the data from material data array into the db table
const seedMaterialsTable = async() => {
    for (const material of materialData) {
        const insertQuery = {
            text: 'INSERT INTO materials (name, image, price) VALUES ($1, $2, $3)'
        }

        // destructure the material into its parts and place in values array
        const values = [
            material.name,
            material.image,
            material.price
        ]

        // use the pool connection to make a query to the db to insert the material
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting material', err)
                return
            }
            console.log(`✅ ${material.name} added successfully`)
        })
    }
}

// function to create pots table
const createPotsTable = async() => {
    const createPotsTableQuery = `
        CREATE TABLE IF NOT EXISTS pots (
            pot_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior_id INT,
            shape_id INT,
            drainage_id INT,
            material_id INT,
            CONSTRAINT fk_exterior FOREIGN KEY (exterior_id)
            REFERENCES exteriors(exterior_id)
            ON DELETE SET NULL,
            CONSTRAINT fk_shape FOREIGN KEY (shape_id)
            REFERENCES shapes(shape_id)
            ON DELETE SET NULL,
            CONSTRAINT fk_drainage FOREIGN KEY (drainage_id)
            REFERENCES drainages(drainage_id)
            ON DELETE SET NULL,
            CONSTRAINT fk_material FOREIGN KEY (material_id)
            REFERENCES materials(material_id)
            ON DELETE SET NULL
        )
    `

    // use the pool connection to query the database with the query
    try {
        const res = await pool.query(createPotsTableQuery)
        console.log('🎉 pots table created successfully')
    } catch (err) {
        console.error('⚠️ error creating pots table', err)
    }
}

// load the data from pots data array into the db table
const seedPotsTable = async() => {
    for (const pot of potData) {
        const insertQuery = {
            text: 'INSERT INTO pots (name, exterior_id, shape_id, drainage_id, material_id) VALUES ($1, $2, $3, $4, $5)'
        }

        // destructure the material into its parts and place in values array
        const values = [
            pot.name,
            pot.exterior_id,
            pot.shape_id,
            pot.drainage_id,
            pot.material_id
        ]

        // use the pool connection to make a query to the db to insert the pot
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting pot', err)
                return
            }
            console.log(`✅ ${pot.name} added successfully`)
        })
    }
}

const resetDatabase = async () => {
    await dropTables()
    // call create function for parents
    await createExteriorsTable()
    await seedExteriorsTable() 

    await createDrainagesTable()
    await seedDrainagesTable()

    await createShapesTable()
    await seedShapesTable()

    await createMaterialsTable()
    await seedMaterialsTable()

    // call the child creation
    await createPotsTable()
    await seedPotsTable()
}

resetDatabase()