import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayLogo from "../../../components/Options/logo/display-logo.jsx";

const DisplayLogoPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DisplayLogo/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DisplayLogoPage;