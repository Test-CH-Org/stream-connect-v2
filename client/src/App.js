import Test from "./components/testComponent";
import Footer from "./components/footer";
import Header from "./components/header";
import Logo from "./components/logo";
import './App.css';

function App() {
    return (
       
        <div className="flex-column justify-flex-start min-100-vh container">
             <Header><Logo/></Header>
            <Footer />
            </div>
            
        
        
    );
}

export default App;
