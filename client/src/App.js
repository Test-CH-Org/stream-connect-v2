import logo from './logo.svg';
import Test from "./components/testComponent";
import Footer from "./components/footer";

import { Box } from '@mui/material';

import './App.css';

function App() {
    return (
        <Box height="100%" className="flex-column justify-flex-start min-100-vh container">
            <Footer />
        </Box>
    );
}

export default App;
