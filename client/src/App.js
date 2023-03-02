import Test from "./components/testComponent";
import Header from "./components/header";
import Footer from "./components/footer";

import { Box } from '@mui/material';

import './App.css';

function App() {
    return (
        <>
        <Box>
            <Header/>
        </Box>
        <Box minHeight="100vh" className="flex-column justify-flex-start min-100-vh container">
            <Footer />
        </Box>
        </>
    );
}

export default App;
