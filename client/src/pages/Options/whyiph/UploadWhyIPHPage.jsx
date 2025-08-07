import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import WhyIPHForm from "../../../components/Options/WhyIPH/WhyIPHForm.jsx";

const UploadWhyIPHPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <WhyIPHForm/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UploadWhyIPHPage;