import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayGallery from "../../../components/Options/gallery/display-gallery.jsx";

const DisplayGalleryPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DisplayGallery/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DisplayGalleryPage;