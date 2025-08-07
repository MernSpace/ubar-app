import React, {useEffect} from 'react';
import NavBar from "../../components/Home/NavBar.jsx";
import Footer from "../../components/Home/Footer.jsx";
import {useSelector} from "react-redux";
import {ReadGalleryRequest} from "../../APIRequest/galleryApiRequest.js";
import PhotoAlbum from "../../components/PhotoAlbum/PhotoAlbum.jsx";
import "../../assets/css/responsive.css"

const NoticePage = () => {

    useEffect(() => {
        (async () => {

            await ReadGalleryRequest();
        })();
    }, []);

    let DataList=useSelector((state)=>(state.gallery.GalleryData));
    return (
        <div className='main_wrapper container'>
            <NavBar/>
            <PhotoAlbum DataList={DataList} />

            <Footer/>
        </div>
    );
};

export default NoticePage;