import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Tokenomics from './pages/Tokenomics'
import Roadmap from './pages/Roadmap'
import Community from './pages/Community'
import Chat from './pages/Chat'
import MemeGenerator from './pages/MemeGenerator'
import Gallery from './pages/Gallery'
import Terminal from './pages/Terminal'
import NotFound from './pages/NotFound'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/community" element={<Community />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/meme-generator" element={<MemeGenerator />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/terminal" element={<Terminal />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
)
