import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Routes } from "./routes/Routes";
import { HashRouter as Router } from "react-router-dom";
import "./css/app.scss";

function App() {
    return (
        <Router>
            <div className="App">
                <div style={{ height: "100%", width: "100%" }}>
                    <Navbar />
                    <div className="contentWrapper">
                        <Routes />
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
