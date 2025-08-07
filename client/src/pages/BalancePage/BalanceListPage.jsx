import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import BalanceList from "../../components/BalanceCreateUpdate/BalanceList.jsx";

const BalanceListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BalanceList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BalanceListPage;