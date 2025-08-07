import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {
    TotalBalanceRequest,
    TotalDueRequest,
    TotalPaymentRequest,
    TotalSellRequest,
    TotalStudentRequest
} from "../../APIRequest/reportApiRequest.js";
import {PiStudentFill} from "react-icons/pi";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const Dashboard = () => {

    useEffect(()=>{
        (async () => {
            await TotalSellRequest()
            await TotalBalanceRequest()
            await TotalPaymentRequest()
            await TotalDueRequest()
            await TotalStudentRequest()
        })();
    },[])
    let SellTotal=useSelector((state)=>(state.report.TotalSell));
    let PaymentTotal=useSelector((state)=>(state.report.TotalPayment));
    let DueTotal=useSelector((state)=>(state.report.TotalDue));
    let StudentTotal=useSelector((state)=>(state.report.TotalStudent));
    let StudentData=useSelector((state)=>(state.report.StudentData));
    let AddBalanceData=useSelector((state)=>(state.report.AddBalanceData));
    const generateDailyReport = (data) => {
        // Group the data by createdDate (date)
        const report = data.reduce((acc, { AdmissionDate, Payment, StudentName }) => {
            // Ensure createdDate is a string and handle invalid or missing dates
            const dateStr = (AdmissionDate && typeof AdmissionDate === 'string')
                ? AdmissionDate
                : (AdmissionDate instanceof Date)
                    ? AdmissionDate.toISOString() // If it's a Date object, convert to ISO string
                    : 'Invalid Date'; // If it's invalid, default to a placeholder

            // Extract just the date part (YYYY-MM-DD)
            const date = dateStr.split('T')[0];

            // Initialize the group for the date if it doesn't exist
            if (!acc[date]) {
                acc[date] = {
                    totalStudents: 0,
                    totalPayment: 0,
                    studentDetails: [],
                };
            }

            // Ensure Payment is a valid number (default to 0 if undefined or invalid)
            const paymentAmount = typeof Payment === 'number' ? Payment : 0;

            // Add student and payment information
            acc[date].totalStudents += 1;
            acc[date].totalPayment += paymentAmount;
            acc[date].studentDetails.push({
                StudentName,
                Payment: paymentAmount,
            });

            return acc;
        }, {});

        // Convert the report object into an array format
        return Object.keys(report).map((date) => ({
            name: date,
            totalStudents: report[date].totalStudents,
            totalPayment: report[date].totalPayment,
            studentDetails: report[date].studentDetails,
        }));
    };

    const generateDailyBalanceReport = (data) => {
        // Group the data by createdAt (date)
        const report = data.reduce((acc, { createdAt, Payment }) => {
            // Check if createdAt is a valid string
            if (!createdAt || typeof createdAt !== 'string') {
                console.error('Invalid createdAt:', createdAt); // Optional: log the invalid entry for debugging
                return acc; // Skip this entry if createdAt is invalid
            }

            const date = createdAt.split('T')[0]; // Extract just the date part (YYYY-MM-DD)

            if (!acc[date]) {
                acc[date] = 0; // Initialize payment sum for the date
            }

            // Add payment information for the date
            acc[date] += Payment;

            return acc;
        }, {});

        // Convert to an array format
        return Object.keys(report).map((date) => ({
            date,       // The date (YYYY-MM-DD)
            totalPayment: report[date], // Sum of payments for the date
        }));
    };
    const generateDailyDueReport = (data) => {
        // Group the data by createdAt (date)
        const report = data.reduce((acc, { createdAt, studentDew }) => {
            // Check if createdAt is a valid string
            if (!createdAt || typeof createdAt !== 'string') {
                console.error('Invalid createdAt:', createdAt); // Optional: log the invalid entry for debugging
                return acc; // Skip this entry if createdAt is invalid
            }

            const date = createdAt.split('T')[0]; // Extract just the date part (YYYY-MM-DD)

            if (!acc[date]) {
                acc[date] = 0; // Initialize payment sum for the date
            }

            // Add payment information for the date
            acc[date] += studentDew;

            return acc;
        }, {});

        // Convert to an array format
        return Object.keys(report).map((date) => ({
            date,       // The date (YYYY-MM-DD)
            totalDue: report[date], // Sum of payments for the date
        }));
    };
    const generateDailyDiscountReport = (data) => {
        // Group the data by createdAt (date)
        const report = data.reduce((acc, { createdAt, discount }) => {
            // Check if createdAt is a valid string
            if (!createdAt || typeof createdAt !== 'string') {
                console.error('Invalid createdAt:', createdAt); // Optional: log the invalid entry for debugging
                return acc; // Skip this entry if createdAt is invalid
            }

            const date = createdAt.split('T')[0]; // Extract just the date part (YYYY-MM-DD)

            if (!acc[date]) {
                acc[date] = 0; // Initialize payment sum for the date
            }

            // Add payment information for the date
            acc[date] += discount;

            return acc;
        }, {});

        // Convert to an array format
        return Object.keys(report).map((date) => ({
            date,       // The date (YYYY-MM-DD)
            totalDiscount: report[date], // Sum of payments for the date
        }));
    };



    let studentChatData = generateDailyReport(StudentData)
    let BalanceChatData = generateDailyBalanceReport(AddBalanceData)
    let DueChatData = generateDailyDueReport(AddBalanceData)
    let DiscountChatData = generateDailyDiscountReport(AddBalanceData)

    const TakaCurrency = ({ amount }) => {
        return <span>৳ {amount}</span>;
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                                <span className="h5">
                                    <TakaCurrency amount={SellTotal.toLocaleString()}/>

                                </span>
                            <p>Total Sell</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                               <span className="h5">
                                   <TakaCurrency amount={PaymentTotal.toLocaleString()}/>
                                </span>
                            <p>Total Payment</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                               <span className="h5">
                                   <TakaCurrency amount={DueTotal.toLocaleString()}/>
                                </span>
                            <p>Total Due</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                               <span className="h5">
                                  {StudentTotal}
                                </span>
                            <p>
                                <PiStudentFill size={20}/>
                                Total Student
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Admission (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart
                                    data={studentChatData}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    {/* Reverse the X-axis by adding the 'reversed' prop */}
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>

                                    <Area
                                        type="monotone"
                                        dataKey="totalStudents"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        name="Total Students"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Payment (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart
                                    data={BalanceChatData}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    {/* Reverse the X-axis by adding the 'reversed' prop */}
                                    <XAxis dataKey="date"/>
                                    <YAxis/>
                                    <Tooltip/>

                                    <Area
                                        type="monotone"
                                        dataKey="totalPayment"
                                        stroke="#FFA500"
                                        fill="#FFA500"
                                        name="Total Payment"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Due (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart
                                    data={DueChatData}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    {/* Reverse the X-axis by adding the 'reversed' prop */}
                                    <XAxis dataKey="date"/>
                                    <YAxis/>
                                    <Tooltip/>

                                    <Area
                                        type="monotone"
                                        dataKey="totalDue"
                                        stroke="#FF6347"
                                        fill="#FF6347"
                                        name="Total Due"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Discount (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart
                                    data={DiscountChatData}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    {/* Reverse the X-axis by adding the 'reversed' prop */}
                                    <XAxis dataKey="date"/>
                                    <YAxis/>
                                    <Tooltip/>

                                    <Area
                                        type="monotone"
                                        dataKey="totalDiscount"
                                        stroke="#32CD32"
                                        fill="#32CD32"
                                        name="Total Due"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
};
export default Dashboard;