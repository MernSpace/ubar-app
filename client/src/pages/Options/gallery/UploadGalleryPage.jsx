import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import GalleryForm from "../../../components/Options/gallery/galleryForm.jsx";

const UploadGalleryPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <GalleryForm/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UploadGalleryPage;