import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import BalanceCreateUpdate from "../../components/BalanceCreateUpdate/BalanceCreateUpdate.jsx";

const BalanceCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BalanceCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BalanceCreateUpdatePage;