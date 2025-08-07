import React, {useEffect, useRef} from 'react';
import {FillStudentFormRequest} from "../../APIRequest/studentApiRequest.js";
import Logo from '../../assets/img/iph-logo.png'
import {useSelector} from "react-redux";
import {getBase64} from "../../helper/FormHelper.js";
import {jsPDF} from "jspdf";

const PrintStudent = () => {
    let FormValue=useSelector((state)=>(state.student.FormValue));
    let studentImgView = useRef()


    useEffect( () => {
        (async ()=>{
            let params = new URLSearchParams(window.location.search);
            let id = params.get('id');
            await FillStudentFormRequest(id)
        })()
    }, []);


    const PreviewImage = () => {
        let ImgFile = studentImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            studentImgView.src=base64Img;
        })
    }

    const admissionDate = new Date(FormValue.AdmissionDate); // assuming FormValue.AdmissionDate is a valid date string
    const formattedDate = admissionDate.toLocaleDateString()
    const printContent = () => {
       alert('Download the Pdf')
    };
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Configuration
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;

        const hrColor = [220, 220, 220]; // Light gray for hr lines
        const borderColor = [0, 0, 0];   // Black for borders

        // Draw page border
        const drawPageBorder = () => {
            doc.setDrawColor(...borderColor);
            doc.setLineWidth(0.1);
            doc.rect(margin / 2, margin / 2, pageWidth - margin, pageHeight - margin);
        };

        // Header Section
        const drawHeader = () => {
            // Institution Details (Left side)
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("ICT PRIVATE HOME", margin, 25);

            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.text("Address: in front of Nachole Thana Gate", margin, 35);
            doc.text("Nachole Chapai Nawabganj.", margin, 42);
            doc.text("Director: Shamim Reja", margin, 49);
            doc.text("Phone: # 01319-355232, #01531-122597", margin, 56);

            doc.addImage(Logo, 'PNG', pageWidth - margin - 40, 20, 40, 20);

            // Horizontal line
            doc.setDrawColor(...hrColor);
            doc.setLineWidth(0.5);
            doc.line(margin, 65, pageWidth - margin, 65);

            // Date and Invoice number
            doc.setFont("helvetica", "normal");

            doc.text(`Admission Date: ${formattedDate}`, margin, 75);

            // Second horizontal line
            doc.line(margin, 80, pageWidth - margin, 80);

            // Admission Form Title
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text("Admission Form", pageWidth / 2, 90, { align: "center" });
        };

        // Student Photo Section (right-aligned)
        const drawStudentPhoto = () => {
            if (FormValue.Photo) {
                const photoWidth = 30;
                const photoHeight = 30;
                const photoX = pageWidth - margin - photoWidth;
                const photoY = 100;

                // Create a cell for the photo that spans the full width
                doc.setDrawColor(...borderColor);
                doc.setLineWidth(0.1);

                // Add photo with border
                doc.rect(photoX, photoY, photoWidth, photoHeight);
                doc.addImage(FormValue.Photo, 'PNG', photoX + 1, photoY + 1, photoWidth - 2, photoHeight - 2);

                return photoY + photoHeight + 10;
            }
            return 100;
        };

        // Student Information Table
        const drawStudentInfo = (startY) => {
            const tableX = margin;
            const lineHeight = 12;
            const tableWidth = pageWidth - (2 * margin);

            const studentData = [
                { label: "Admission Roll", value: FormValue.AdmissionRoll },
                { label: "Student Name", value: FormValue.StudentName },
                { label: "Parent Name", value: FormValue.ParentName},
                { label: "Address", value: FormValue.Address },
                { label: "Class", value: FormValue.Class },
                { label: "Session", value: FormValue.Session},
                { label: "Gender", value: FormValue.Gender},
                { label: "Religion", value: FormValue.Religion},
                { label: "Student Phone", value: FormValue.StudentPhone},
                { label: "Course Fee", value: FormValue.CourseFee}
            ];

            // Draw table
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.setDrawColor(...borderColor);
            doc.setLineWidth(0.1);

            // Draw outer table border
            doc.rect(tableX, startY, tableWidth, (studentData.length * lineHeight));

            studentData.forEach((data, index) => {
                const yPos = startY + (index * lineHeight);

                // Draw horizontal line for row
                if (index > 0) {
                    doc.line(tableX, yPos, tableX + tableWidth, yPos);
                }

                // Draw text content
                doc.text(data.label, tableX + 5, yPos + 8);
                doc.text(":", tableX + 70, yPos + 8);
                doc.text(String(data.value), tableX + 85, yPos + 8);
            });

            return startY + (studentData.length * lineHeight) + 15;
        };

        // Generate PDF
        drawPageBorder(); // Add page border first
        drawHeader();
        const photoEndY = drawStudentPhoto();
        const tableEndY = drawStudentInfo(photoEndY);

        // Save the PDF
        doc.save('admission_form.pdf');
    };


    return (
        <div className="container my-5">
            <div className="card shadow">
                <div className="card-body" id="invoice-content">
                    {/* Header Section */}
                    <div className="row mb-4 justify-content-center align-items-center">
                        <div className="col-md-8">
                            <h3 className="fw-bold">ICT PRIVATE HOME</h3>
                            <p className="mb-1">
                                Address: in front of Nachole Thana Gate<br/>
                                Nachole Chapai Nawabganj.
                            </p>
                            <p className="mb-1">Director: Shamim Reja</p>
                            <p className="mb-1">Phone: # 01319-355232, #01531-122597</p>
                        </div>
                        <div className="col-md-4 text-end">
                            <img src={Logo} alt="IPH Logo" className="img-fluid"
                                 style={{maxWidth: '150px'}}/>
                        </div>
                    </div>
                    {/* Invoice Details */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <hr className=""/>
                            <p className="mb-1">
                                <strong>Date:</strong>{' '}
                                {isNaN(admissionDate) ? 'Invalid Date' : admissionDate.toLocaleDateString()}

                            </p>
                            <hr className=""/>
                        </div>

                    </div>

                    <div className="text-center mb-4">
                        <h4 className=" py-2">Admission Form</h4>
                    </div>

                    {/* Student Photo */}


                    {/* Student Details Table */}
                    <div className='row'>
                        <div className="table-responsive table border">
                            <div className="text-end mb-4">
                                <img ref={(input) => studentImgView = input}  className=" p-2"
                                     style={{
                                         width: '180px',
                                         height: '180px',
                                         objectFit: 'cover'
                                     }}
                                     src={FormValue.Photo} alt=""/>
                            </div>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td width="30%"><strong>Admission Roll</strong></td>
                                    <td width="5%">:</td>
                                    <td>{FormValue.AdmissionRoll}</td>
                                </tr>
                                <tr>
                                    <td><strong>Student Name</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.StudentName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Parent Name</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.ParentName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Address</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.Address}</td>
                                </tr>
                                <tr>
                                    <td><strong>Class</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.Class}</td>
                                </tr>
                                <tr>
                                    <td><strong>Session</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.Session}</td>
                                </tr>
                                <tr>
                                    <td><strong>Gender</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.Gender}</td>
                                </tr>
                                <tr>
                                    <td><strong>Religion</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.Religion}</td>
                                </tr>
                                <tr>
                                    <td><strong>Student Phone</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.StudentPhone}</td>
                                </tr>
                                <tr>
                                    <td><strong>Course Fee</strong></td>
                                    <td>:</td>
                                    <td>{FormValue.CourseFee}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-4">
                        <p className="text-muted">
                            <strong>NOTE:</strong> This is computer generated receipt and does not require physical
                            signature.
                        </p>

                        <div className="mt-4">
                            <button className="btn btn-primary me-2" onClick={printContent}>
                                <i className="fa-solid fa-print me-2"></i>
                                Print
                            </button>
                            <button className="btn btn-secondary" onClick={downloadPDF}>
                                <i className="fa-solid fa-download me-2"></i>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintStudent;