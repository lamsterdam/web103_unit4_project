import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewPots from './pages/ViewPots'
import EditPot from './pages/EditPot'
import CreatePot from './pages/CreatePot'
import PotDetails from './pages/PotDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreatePot title='BOLT BUCKET | Customize' />
    },
    {
      path:'/pots',
      element: <ViewPots title='BOLT BUCKET | Custom Pots' />
    },
    {
      path: '/pots/:id',
      element: <PotDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditPot title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App