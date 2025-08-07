import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import LogoForm from "../../../components/Options/logo/LogoForm.jsx";

const UploadLogoPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <LogoForm/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UploadLogoPage;