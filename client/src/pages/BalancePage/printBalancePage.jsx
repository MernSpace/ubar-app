import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import PrintBalance from "../../components/BalanceCreateUpdate/PrintBalance.jsx";

const PrintBalancePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PrintBalance/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PrintBalancePage;