import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Card from './components/Card';
import LoadingSpinner from './components/LoadingSpinner';
import ProgressBar from './components/ProgressBar';
import Network from './components/Network';
import ExportData from './components/ExportData';
import HttpPackets from './components/HttpPackets'; // Import the HttpPackets component
import './App.css';
import { dummyData } from './data/dummyData';
import Alerts from './components/Alerts';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(dummyData);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Router>
            <div className="dashboard">
                <header className="dashboard-header">
                    <h1>Cyberpunk SOC SIEM Dashboard</h1>
                </header>
                <aside className="dashboard-sidebar">
                    <nav>
                        <ul>
                            <li><Link to="/">Overview</Link></li>
                            <li><Link to="/alerts">Alerts</Link></li>
                            <li><a href="/top-ips">Top IPs</a></li>
                            <li><Link to="/network">Network</Link></li>
                            <li><Link to="/export">Export Data</Link></li>
                            <li><Link to="/http">HTTP</Link></li> {/* Add HTTP link */}
                        </ul>
                    </nav>
                </aside>
                <main className="dashboard-main">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <div className="cards-container">
                                        {data.map((item, index) => (
                                            <Card key={index} title={item.title}>
                                                <p>{item.content}</p>
                                                <ProgressBar progress={item.progress} />
                                            </Card>
                                        ))}
                                    </div>
                                    
                                   
                                </>
                            } />
                            <Route path="/network" element={<Network />} />
                            <Route path="/export" element={<ExportData />} />
                            <Route path="/http" element={<HttpPackets />} />
                            <Route path="/alerts" element={<Alerts />} /> 
                            
                        </Routes>
                    )}
                </main>
            </div>
        </Router>
    );
};

export default App;
