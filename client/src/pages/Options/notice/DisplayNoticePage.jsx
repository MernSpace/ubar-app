import React, {Fragment, Suspense, useEffect} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayNotice from "../../../components/Options/notice/display-notice.jsx";

const DisplayNoticePage = () => {

    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DisplayNotice/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DisplayNoticePage;