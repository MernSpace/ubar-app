import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import CarouselForm from "../../../components/Options/carousel/carouselForm.jsx";

const UploadCarouselPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CarouselForm/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UploadCarouselPage;