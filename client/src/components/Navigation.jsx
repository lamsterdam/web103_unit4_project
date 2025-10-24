import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>DIY Plant Pot 🪴🌻</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Customize</a></li>
                <li><a href='/pots' role='button'>View Pots</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation