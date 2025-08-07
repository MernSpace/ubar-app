import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayInfo from "../../../components/Options/info/display-info.jsx";

const DisplayInfoPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DisplayInfo/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DisplayInfoPage;