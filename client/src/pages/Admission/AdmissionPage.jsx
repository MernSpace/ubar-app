import React, {useRef, useState} from 'react';
import Logo from '../../assets/img/iph-logo.png'
import NavBar from "../../components/Home/NavBar.jsx";
import Footer from "../../components/Home/Footer.jsx";
import {useSelector} from "react-redux";
import {ErrorToast, getBase64, IsEmpty} from "../../helper/FormHelper.js";
import {CreateStudentRequest} from "../../APIRequest/studentApiRequest.js";
import {OnChangeStudentInput, ResetFormValue} from "../../redux/state-slice/student-slice.js";
import store from "../../redux/store/store.js";
import {Toaster} from "react-hot-toast";
import {Button, Modal} from "react-bootstrap";
const AdmissionPage = () => {
    let studentImgRef,studentImgView = useRef()

    let FormValue=useSelector((state)=>(state.student.FormValue));

    const PreviewImage = () => {
        let ImgFile = studentImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            studentImgView.src=base64Img;
        })
    }

    const [showModal, setShowModal] = useState(false);

    const modalStyle = { // Styles for the modal content
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        textAlign:"center",
    };

    const checkmarkContainerStyle = { // Styles for the checkmark circle
        backgroundColor: '#d8014c', // Green color
        borderRadius: '50%',
        width: '80px', // Increased size
        height: '80px', // Increased size
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px', // Increased spacing
    };

    const checkmarkStyle = { // Styles for the checkmark SVG
        width: '40px', // Increased size
        height: '40px', // Increased size
        fill: 'white',
    };

    const okButtonStyle = {
        backgroundColor: '#d8014c',
        borderColor: '#d8014c',
        padding: '10px 20px',
    };


    const SaveChange = async () => {
        let photo = studentImgView.src;
        if (IsEmpty(FormValue.StudentName)) {
            ErrorToast("Student Name Required!");
        }
        else if (IsEmpty(FormValue.ParentName)) {
            ErrorToast("Student Parent's Name Required!");
        }
        else if (IsEmpty(FormValue.Email)) {
            ErrorToast("Student Email Required!");
        }
        else if (IsEmpty(FormValue.Address)) {
            ErrorToast("Student Address Required!");
        }
        else if (IsEmpty(FormValue.Class)) {
            ErrorToast("Student Class Required!");
        }
        else if (IsEmpty(FormValue.Session)) {
            ErrorToast("Student Session Required!");
        }
        else if (IsEmpty(FormValue.Gender)) {
            ErrorToast("Student Gender Required!");
        }
        else if (IsEmpty(FormValue.Religion)) {
            ErrorToast("Student Religion Required!");
        }
        else if (IsEmpty(FormValue.AdmissionDate)) {
            ErrorToast("Student Admission Required!");
        }
        else if (IsEmpty(FormValue.StudentPhone)) {
            ErrorToast("Student Phone Required!");
        }
        else if (IsEmpty(FormValue.GuardianPhone)) {
            ErrorToast("Guardian Phone Required!");
        }


        // Validate the photo
        else if (IsEmpty(photo)) {
            ErrorToast("Student Photo Required!");
            return;  // Return early if validation fails
        }else {

            // If all validations pass, create the form value
            const updateStudentFormValue = {
                ...FormValue,
                Photo: photo,
                Approval: false
            };

            try {
                // Assuming CreateStudentRequest handles the API call
                await CreateStudentRequest(updateStudentFormValue, 0);
                // Reset the form values after successful submission
                ResetFormValue();

                setShowModal(!showModal)
            } catch (error) {
                // Error handling for failed form submission
                ErrorToast("Failed to submit the form. Please try again!");
            }

        }
    }


    return (
        <div className='main_wrapper container'>
            <NavBar />
            <section id="addmission">
                <Toaster/>
                <div className="container">
                    <div className="row">
                        <div className="text-center">
                            <img src={Logo} alt="logo" className="img-fluid logo"/>
                            <h2>Student Admission</h2>
                            <p>Ict Private Home ,In Front Of Nachole Thana Gate, Nachole,Chapai Nawabganj</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="card">
                            <div className="card-header">
                                <h2> Please fill up your informations</h2>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="inputName" className="form-label">Student Name</label>
                                        <input type="text" className="form-control"
                                               value={FormValue.StudentName}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "StudentName",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputParent" className="form-label">Parent Name</label>
                                        <input type="text" className="form-control"
                                               value={FormValue.ParentName}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "ParentName",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail" className="form-label">Email</label>
                                        <input type="text"  className="form-control"
                                               value={FormValue.Email}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "Email",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control"
                                               value={FormValue.Address}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "Address",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputClass" className="form-label">Class</label>
                                        <select
                                            className="form-select mb-3"
                                            name="class"
                                            id="inputClass"
                                            value={FormValue.Class}
                                            onChange={(e) => {
                                                store.dispatch(OnChangeStudentInput({
                                                    Name: "Class",
                                                    Value: e.target.value
                                                }));
                                            }}
                                        >
                                            <option value="">Select your class</option>
                                            {/* Removed 'selected' from here */}
                                            <option value="inter-1st">Inter First Year</option>
                                            <option value="inter-2nd">Inter Second Year</option>
                                            <option value="Revision-Batch">Revision Batch</option>
                                        </select>

                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputClass" className="form-label">Section</label>
                                        <select
                                            className="form-select mb-3"
                                            name="class"
                                            id="inputClass"
                                            value={FormValue.Session}
                                            onChange={(e) => {
                                                store.dispatch(OnChangeStudentInput({
                                                    Name: "Session",
                                                    Value: e.target.value
                                                }));
                                            }}
                                        >
                                            <option value="">Select your Session</option>
                                            {/* Removed 'selected' from here */}
                                            <option value="2023-2024">2023-2024</option>
                                            <option value="2024-2025">2024-2025</option>
                                            <option value="2025-2026">2025-2026</option>
                                            <option value="2026-2027">2026-2027</option>
                                            <option value="2027-2028">2027-2028</option>
                                            <option value="2028-2029">2028-2029</option>
                                            <option value="2029-2030">2029-2030</option>
                                            <option value="2030-2031">2030-2031</option>
                                            <option value="2031-2032">2031-2032</option>
                                            <option value="2032-2033">2032-2033</option>
                                            <option value="2033-2034">2033-2034</option>
                                            <option value="2033-2034">2033-2034</option>
                                            <option value="2034-2035">2034-2035</option>
                                            <option value="2035-2036">2035-2036</option>
                                            <option value="2036-2037">2036-2037</option>
                                            <option value="2037-2038">2037-2038</option>
                                            <option value="2038-2039">2038-2039</option>
                                            <option value="2039-2040">2039-2040</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputGender" className="form-label ml-4">Gender</label> &nbsp;
                                                <select
                                                    className="form-select mb-3"
                                                    name="class"
                                                    id="inputClass"
                                                    value={FormValue.Gender}
                                                    onChange={(e) => {
                                                        store.dispatch(OnChangeStudentInput({
                                                            Name: "Gender",
                                                            Value: e.target.value
                                                        }));
                                                    }}
                                                >
                                                    <option value="">Select your Gender</option>
                                                    {/* Removed 'selected' from here */}
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>

                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputReligion" className="form-label">Religion</label>
                                        <select
                                            className="form-select mb-3"
                                            name="class"
                                            id="inputClass"
                                            value={FormValue.Religion}
                                            onChange={(e) => {
                                                store.dispatch(OnChangeStudentInput({
                                                    Name: "Religion",
                                                    Value: e.target.value
                                                }));
                                            }}
                                        >
                                            <option value="">Select your Religion</option>
                                            {/* Removed 'selected' from here */}
                                            <option value="Islam">Islam</option>
                                            <option value="Hindu">Hindu</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputDate" className="form-label">Admission Date</label>
                                        <input type="date" name="date" className="form-control" id="inputDate"
                                               value={FormValue.AdmissionDate}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "AdmissionDate",
                                                       Value: e.target.value
                                                   }));
                                               }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="stuPhone" className="form-label">Student Phone</label>
                                        <input type="number" name="stu_phone" className="form-control" id="stuPhone"
                                               value={FormValue.StudentPhone}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "StudentPhone",
                                                       Value: e.target.value
                                                   }));
                                               }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="guardPhone" className="form-label">Guardian Phone</label>
                                        <input type="number" name="guardPhone" className="form-control"
                                               id="guardPhone"
                                               value={FormValue.GuardianPhone}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "GuardianPhone",
                                                       Value: e.target.value
                                                   }));
                                               }}
                                        />
                                    </div>
                                    <div className="col-md-6 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage} ref={(input) => studentImgRef = input}
                                               placeholder="" className="form-control "
                                               type="file"/>
                                    </div>
                                    {showModal && (
                                        <Modal show={true} onHide={()=>{setShowModal(false)}} centered> {/* Added centered prop */}
                                            <Modal.Body style={modalStyle}> {/* Apply modal styles */}
                                                <div style={checkmarkContainerStyle}> {/* Apply checkmark container styles */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" style={checkmarkStyle} className="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                    </svg>
                                                </div>
                                                <h4>Thank You!</h4> {/* Added h4 for title */}
                                                <p>Application Submitted Successfully.<br/> Wee will contact you shortly!</p>
                                                <Button style={okButtonStyle} onClick={()=>{setShowModal(false)}}>OK</Button> {/* Apply OK button styles */}
                                            </Modal.Body>
                                        </Modal>
                                    )}
                                    <div className="col-12">
                                        <button className="btn" style={{backgroundColor:"#d8014c",color:"#fff"}} onClick={SaveChange}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default AdmissionPage;