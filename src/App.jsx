import React from 'react'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import SideBar from './components/sidebar/SideBar'
import Graph from './components/graph/Graph'


const App = () => {
  return (
    <div className='container-fluid'>
      <Header/>
      <div className="row app-body">
        <div className='col-lg-4 col-md-6 sidebar'><SideBar/></div>
        <div className='col-lg-8 col-md-6 contenet'>
          <Home/>
          <Graph/>
        </div>
      </div>
      
    </div>
  )
}

export default App