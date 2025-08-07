import React, {Fragment, Suspense, useEffect} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../../components/MasterLayout/LazyLoader.jsx";
import DisplayNotice from "../../../components/Options/notice/display-notice.jsx";
import SubscribeList from "../../../components/Options/subscribe/subscribe-list.jsx";

const SubscribePage = () => {

    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SubscribeList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SubscribePage;