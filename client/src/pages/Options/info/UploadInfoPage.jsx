import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import InfoForm from "../../../components/Options/info/infoForm.jsx";

const UploadInfoPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <InfoForm/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UploadInfoPage;