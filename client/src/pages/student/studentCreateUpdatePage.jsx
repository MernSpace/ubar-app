import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import StudentCreateUpdate from "../../components/student/StudentCreateUpdate.jsx";

const StudentCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <StudentCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default StudentCreateUpdatePage;