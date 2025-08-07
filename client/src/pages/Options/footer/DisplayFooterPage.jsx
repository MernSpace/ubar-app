import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayFooter from "../../../components/Options/footer/display-footer.jsx";

const DisplayFooterPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DisplayFooter/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DisplayFooterPage;