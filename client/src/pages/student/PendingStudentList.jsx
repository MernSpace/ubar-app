import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import PendingList from "../../components/student/PendingList.jsx";
const PendingStudentPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PendingList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PendingStudentPage;