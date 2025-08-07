import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import StudentList from "../../components/student/studentList.jsx";
const StudentListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <StudentList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default StudentListPage;