import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import NoticeForm from "../../../components/Options/notice/noticeForm.jsx";

const UploadNoticePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NoticeForm/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default UploadNoticePage;