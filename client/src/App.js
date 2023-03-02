import logo from './logo.svg';
import Test from "./components/testComponent";
import Footer from "./components/footer";
import SearchResults from "./components/searchResults";

import { Box } from '@mui/material';

import './App.css';

function App() {
    return (
        <Box minHeight="100vh" className="flex-column justify-flex-start min-100-vh container">
            <SearchResults />
            <Footer />
        </Box>
    );
}

export default App;
