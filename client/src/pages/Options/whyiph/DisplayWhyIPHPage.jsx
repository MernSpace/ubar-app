import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayIph from "../../../components/Options/WhyIPH/display-iph.jsx";

const DisplayWhyIPHPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DisplayIph/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DisplayWhyIPHPage;