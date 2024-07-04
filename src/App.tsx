import React from 'react'
import './App.css'
import '../public/css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import PostPage from './pages/PostPage';
import About from './pages/About';

const App:React.FC = () => {
    return (
        <div className='container'>
            <Header/>
            <Router>
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/post/:id' Component={PostPage}/>
                    <Route path='/about' Component={About} />
                </Routes>
            </Router>
            <Footer/>
        </div>
    )
}

export default App