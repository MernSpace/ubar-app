import React, {useEffect} from 'react';
import {DetailBalanceRequest} from "../../APIRequest/balanceApiRequest.js";
import {Container, Row, Col, Card, ListGroup, Button, Spinner} from 'react-bootstrap';
import {useSelector} from "react-redux";
import { jsPDF } from 'jspdf';
import logoImage from '../../assets/img/iph-logo.png'

const PrintBalance = () => {

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');

        if (id !== null) {
            const fetchBalanceDetails = async () => {
                try {
               await DetailBalanceRequest(id);

                    // Assuming the response has the data you want
                } catch (error) {
                    console.error("Error fetching balance details:", error);
                    // Optional: Handle error (show toast, set error state)
                }
            };

            fetchBalanceDetails();
        }
    }, []);

    let Data=useSelector((state)=>(state.balance.BalanceDetail));
    if (!Data || Object.keys(Data).length === 0) {
        return (
            <Container className="text-center">
                <Row>
                    <Col>
                        <Spinner animation="border" variant="primary" />
                        <p>Loading...</p>
                    </Col>
                </Row>
            </Container>
        );
    }
    const generatePaymentSlip = () => {
        const doc = new jsPDF();

        // Set initial font
        doc.setFont("helvetica");

        // Company info on the left
        doc.setFontSize(20);
        doc.text('ICT PRIVATE HOME', 20, 20);

        // Address and contact info on the left
        doc.setFontSize(10);
        doc.text('Address: in front of Nachole Thana Gate', 20, 30);
        doc.text('Nachole Chapai Nawabganj.', 20, 35);
        doc.text('Director: Shamim Reja', 20, 40);
        doc.text('Phone: # 01319-355232, #01531-122597', 20, 45);

        // Add logo on the right
        doc.addImage(logoImage, 'PNG', 150, 15, 40, 20); // Adjusted position and size

        // First horizontal line
        doc.setLineWidth(0.5);
        doc.line(20, 50, 190, 50);

        // Date and Invoice number
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Date: ", 20, 60);
        doc.text("Invoice No:", 140, 60);
        doc.setFont("helvetica", "normal");
        const formattedDate = new Date(Data.createdAt).toLocaleString()
        doc.text(` ${formattedDate}`, 30, 60);
        doc.text(`${Data.invNumber}`, 165, 60);

        // Second horizontal line
        doc.line(20, 65, 190, 65);

        // Payment Slip Title
        doc.setFontSize(22);
        doc.text('Payment Slip', 105, 75, { align: 'center' });

        // Table configuration
        doc.setFontSize(16);
        const startY = 90;
        const lineHeight = 10;
        const padding = 3;
        const columns = {
            label: { x: 30, width: 60 },
            colon: { x: 90, width: 10 },
            value: { x: 100, width: 70 }
        };

        const details = [
            ['Admission Roll', Data.studentDetails.AdmissionRoll],
            ['Student Name', Data.studentDetails.StudentName],
            ['Parent Name', Data.studentDetails.ParentName],
            ['Class', Data.studentDetails.Class],
            ['Session', Data.studentDetails.Session],
            ['Payment', `BDT ${Data.Payment}`],
            ['Discount', `BDT ${Data.discount}`],
            ['Due', Data.studentDetails.dew === 0 ? 'Paid' : `BDT ${Data.studentDetails.dew}`]
        ];


// Set thin line width (1px equivalent)
        doc.setLineWidth(0.1);  // 0.353 mm is approximately 1px

// Calculate table dimensions
        const tableWidth = columns.label.width + columns.colon.width + columns.value.width;
        const tableHeight = details.length * lineHeight;
        const tableX = columns.label.x;

// Draw table outer border (top, bottom and right sides only)
// Top line
        doc.line(tableX, startY - padding, tableX + tableWidth, startY - padding);
// Bottom line
        doc.line(tableX, startY + tableHeight + padding, tableX + tableWidth, startY + tableHeight + padding);
// Right line
        doc.line(tableX + tableWidth, startY - padding, tableX + tableWidth, startY + tableHeight + padding);
// Left line
        doc.line(tableX, startY - padding, tableX, startY + tableHeight + padding);

// Draw horizontal lines
        details.forEach((_, index) => {
            if (index < details.length - 1) {
                const y = startY + (lineHeight * (index + 1));
                doc.line(tableX, y, tableX + tableWidth, y);
            }
        });

// Fill in table data
        details.forEach((detail, index) => {
            const y = startY + (lineHeight * index) + (lineHeight / 2) + 1;
            doc.text(detail[0], columns.label.x + padding, y);
            doc.text(':', 90, y);
            doc.text(detail[1], columns.value.x, y); // Removed padding for values column
        });

        // Footer section
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("NOTE:", 85, 180);
        doc.setFont("helvetica", "normal");
        const footerText = 'This is computer generated receipt and does not require physical signature.';
        doc.text(footerText, 105, 190, { align: 'center' });

        // Add a border around the whole document
        doc.setLineWidth(0.1);
        doc.rect(10, 10, 190, 277);

        // Save the PDF
        doc.save(`payment_slip_${Data.invNumber}.pdf`);
    };

    return (

        <Container className="mt-4">
            <h1 className="text-center mb-4">Invoice</h1>

            {/* Invoice Details Card */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Invoice Number: {Data.invNumber}</Card.Title>
                    <Card.Text>
                        <strong>Created Date:</strong> {new Date(Data.createdAt).toLocaleString()}
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Student Details Section */}
            <Row className="mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Student Details</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item className='text-lg fw-bold'><strong>Student Name:</strong> {Data.studentDetails.StudentName}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Admission Roll:</strong> {Data.studentDetails.AdmissionRoll}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Class:</strong> {Data.studentDetails.Class}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Session:</strong> {Data.studentDetails.Session}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Religion:</strong> {Data.studentDetails.Religion}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Gender:</strong> {Data.studentDetails.Gender}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Phone:</strong> {Data.studentDetails.StudentPhone}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Email:</strong> {Data.studentDetails.Email}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Parent Name:</strong> {Data.studentDetails.ParentName}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Guardian Phone:</strong> {Data.studentDetails.GuardianPhone}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Address:</strong> {Data.studentDetails.Address}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className='mb-4'>
                        <Card.Body>
                            <Card.Title>Student Photo</Card.Title>
                            <img src={Data.studentDetails.Photo} alt={`${Data.studentDetails.StudentName}'s photo`}
                                 className=""
                                 style={{
                                     width: '160px',
                                     height: '160px',
                                     objectFit: 'cover'
                                 }}/>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Payment Information</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item className='text-lg fw-bold'><strong>Previous Due:</strong> {Data.studentDew}</ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Total Paid:</strong> {Data.Payment}
                                </ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Discount:</strong> {Data.discount}
                                </ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Amount Due:</strong> {Data.studentDetails.dew}
                                </ListGroup.Item>
                                <ListGroup.Item className='text-lg fw-bold'><strong>Note:</strong> {Data.Note}
                                </ListGroup.Item>

                            </ListGroup>
                        </Card.Body>

                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Status</Card.Title>
                            <Card.Text className='text-lg fw-bold'>{Data.studentDetails.Approval ? 'Approved' : 'Pending'}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Payment Details Section */}


            {/* Footer Button */}
            <div className="text-center">
                <Button variant="primary" onClick={generatePaymentSlip}>Print Invoice</Button>
            </div>
        </Container>
)
    ;
};

export default PrintBalance;