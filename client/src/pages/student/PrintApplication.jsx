import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import PrintStudent from "../../components/student/printStudent.jsx";

const PrintApplicationPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PrintStudent/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PrintApplicationPage;