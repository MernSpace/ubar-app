import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import FooterForm from "../../../components/Options/footer/footerForm.jsx";

const UploadFooterPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <FooterForm/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UploadFooterPage;