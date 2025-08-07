import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayCarousel from "../../../components/Options/carousel/display-carousel.jsx";

const DisplayCarouselPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DisplayCarousel/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DisplayCarouselPage;