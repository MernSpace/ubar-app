import React, {useEffect} from 'react';
import NavBar from "../../components/Home/NavBar.jsx";
import Footer from "../../components/Home/Footer.jsx";
import {ReadNoticeRequest} from "../../APIRequest/noticeApiRequest.js";
import {useSelector} from "react-redux";
import {Card, CardHeader} from "react-bootstrap";

const NoticePage = () => {

    useEffect(() => {
        (async () => {

            await ReadNoticeRequest();
        })();
    }, []);

    let DataList=useSelector((state)=>(state.notice.NoticeData));
    return (
        <div className='main_wrapper container'>
            <NavBar/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mb-4">
                {DataList && DataList.map((noticeItem) => (
                    <Card
                        key={noticeItem._id}
                        className="hover:shadow-lg transition-shadow duration-200 mb-4"
                    >
                        <CardHeader className="bg-gray-50">
                            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {noticeItem.createdAt}
                </span>
                            <br/>
                                <span className="text-sm text-gray-500">
                  By Admin
                </span>
                            </div>
                        </CardHeader>
                        <div className="p-4">
                        <p className="text-gray-600">{noticeItem.notice}</p>
                        </div>

                    </Card>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default NoticePage;