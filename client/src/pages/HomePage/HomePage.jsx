import { Fragment } from 'react';
import NavBar from "../../components/Home/NavBar.jsx";
import Footer from "../../components/Home/Footer.jsx";
import AutoBookingPage from '../../components/Home/index.jsx';

const HomePage = () => {
    return (
        <Fragment>
            <NavBar />
            <AutoBookingPage />
            <Footer />
        </Fragment>
    );
};

export default HomePage;