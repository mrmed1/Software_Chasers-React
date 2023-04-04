import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {CreateStudent, DeleteStudent, GetAllStudents, UpdateStudent} from "../../Service/etudiant.service";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "@mui/material";
import './ListEtudiant.css';
import toast, {Toaster} from "react-hot-toast";

export default function ListEtudiant() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
    const [addStudentDialogVisible, setAddStudentDialogVisible] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [firstnameError, setFirstnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [levelError, setLevelError] = useState(false);
    const [classError, setClassError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [newStudent, setNewStudent] = useState({
        lastname: '',
        firstname: '',
        email: '',
        login: '',
        password: '',
        role: '',
        level: '',
        class: '',
        phone: '',
        dob: '',
        isPublic: true,
    });

    const queryClient = useQueryClient();

    const {isLoading, isError, data: students, error} = useQuery('students', GetAllStudents, {
        retry: false,
        refetchOnWindowFocus: false
    });

    const updateStudentMutation = useMutation((updatedStudent) => {
        return UpdateStudent(updatedStudent);
    }, {
        onSuccess: () => {
            toast.success('Student Updated Successfully');
            // Invalidate the 'students' query to refetch the latest data
            queryClient.invalidateQueries('students');
        },
        onError: (error) => {
            toast.error('Error in Updating Student', error);
        }
    });
    const deleteStudentMutation = useMutation((studentId) => {
        return DeleteStudent(studentId);
    }, {
        onSuccess: () => {
            toast.success('Student Deleted Successfully')
            // Invalidate the 'students' query to refetch the latest data
            queryClient.invalidateQueries('students');
            setDeleteStudentDialog(false);
        }
    });
    const createStudentMutation = useMutation((newStudent) => {
        return CreateStudent(newStudent);
    }, {
        onSuccess: () => {
            // Invalidate the 'students' query to refetch the latest data
            queryClient.invalidateQueries('students');
            setAddStudentDialogVisible(false);
            toast.success('Student Added Successfully');
            setNewStudent({
                lastname: '',
                firstname: '',
                email: '',
                login: '',
                password: '',
                role: '',
                level: '',
                class: '',
                phone: '',
                dob: '',
                isPublic: true,
            });
        },
        onError: (error) => {
            toast.error('Error in Adding Student', error);
        }
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Button label="Add Student" onClick={() => {
                setAddStudentDialogVisible(true)
            }}/>
        </div>
    );
    /**this Section for add Student**/

    const handleSubmit = (event) => {
        event.preventDefault();
        newStudent.role = "STUDENT";
        let hasError = false;
        if (!newStudent.lastname) {
            setLastnameError(true);
            hasError = true;
        }

        if (!newStudent.firstname) {
            setFirstnameError(true);
            hasError = true;
        }
        if (!newStudent.email) {
            setEmailError(true);
            hasError = true;
        }
        if (!newStudent.login) {
            setLoginError(true);
            hasError = true;
        }
        if (!newStudent.password) {
            setPasswordError(true);
            hasError = true;
        }
        if (!newStudent.level) {
            setLevelError(true);
            hasError = true;
        }
        if (!newStudent.class) {
            setClassError(true);
            hasError = true;
        }
        if (!newStudent.dob) {
            setDobError(true);
            hasError = true;
        }

        if (!hasError) {
            createStudentMutation.mutate(newStudent);
        }

    };
    /**this Section for delete Student**/
    const confirmDeleteStudent = (student) => {
        setSelectedStudent(student);
        setDeleteStudentDialog(true);
    };

    const deleteStudentDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text"
                    onClick={() => setDeleteStudentDialog(false)}/>
            <Button label="Delete" icon="pi pi-trash" className="p-button-text"
                    onClick={() => deleteStudentMutation.mutate(selectedStudent._id)} autoFocus/>
        </>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteStudent(rowData)}/>
            </>
        );
    };

    /**this Section for update Student**/
    //this function for converter date format from iso to dd/mm/yyyy
    function dateTemplate(rowData, column) {
        const date = new Date(rowData.dob);
        return date.toLocaleDateString();
    }

    //this function for converter date format from dd/mm/yyyy to iso

    const onRowEditComplete = (e) => {
        const {newData} = e;
        //change the format of date from dd/mm/yyyy to iso

        delete newData.isResponsible;
        delete newData.__v;
        // Call the updateStudentMutation function to update the student
        updateStudentMutation.mutate(newData);
    };

    function rowEditorTemplate(rowData, props) {
        const rowEditor = props.rowEditor;
        if (rowEditor.editing) {
            return rowEditor.element; // default element
        } else {
            // custom init element
            return (
                <React.Fragment>
                    <Button icon="pi pi-pencil" rounded outlined onClick={rowEditor.onInitClick}/>
                </React.Fragment>

            )
        }
    }
    const textEditor = (options) => {
        if (options.field === 'dob') {

            return <Calendar
                value={new Date(options.value)}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        } else {

            return <InputText type="text" value={options.value}
                              onChange={(e) => options.editorCallback(e.target.value)}/>;
        }

    };

    return (
        <div className="card">
            <Toaster/>
            <h2>List of students</h2>
            <DataTable value={students} editMode="row" selectionMode="single" header={header}
                       onRowEditComplete={onRowEditComplete} dataKey="_id" selection={selectedStudent}
                       onSelectionChange={(e) => setSelectedStudent(e.value)}>
                <Column header="#" headerStyle={{width: '3rem'}}
                        body={(data, options) => options.rowIndex + 1}></Column>
                <Column field="lastname" header="Last Name" editor={(options) => textEditor(options)}
                        style={{width: '20%'}}></Column>
                <Column field="firstname" header="First Name" editor={(options) => textEditor(options)}
                        style={{width: '20%'}}></Column>
                <Column field="email" header="Email" editor={(options) => textEditor(options)}
                        style={{width: '20%'}}></Column>
                <Column field="level" header="Level" editor={(options) => textEditor(options)}
                        style={{width: '20%'}}></Column>
                <Column field="class" header="Class" editor={(options) => textEditor(options)}
                        style={{width: '20%'}}></Column>
                <Column field="phone" header="Phone" editor={(options) => textEditor(options)}
                        style={{width: '20%'}}></Column>
                <Column field="dob" header="Date of Birth" body={dateTemplate} editor={(options) => textEditor(options)}
                        style={{width: '20%'}}></Column>
                <Column className="mr-2" rowEditor body={rowEditorTemplate}></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>
            <Dialog visible={deleteStudentDialog} header="Confirmation" modal style={{width: '350px'}}
                    footer={deleteStudentDialogFooter} onHide={() => setDeleteStudentDialog(false)}>
                <div className="p-d-flex p-ai-center">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    <span>Are you sure you want to delete this student?</span>
                </div>
            </Dialog>

            <Dialog header="Add Student" visible={addStudentDialogVisible}
                    onHide={() => setAddStudentDialogVisible(false)} style={{width: "50%"}}>
                <form onSubmit={handleSubmit}>
                    <div className="p-fluid">

                        <div className="p-field-wrapper">
                            <div className="p-field">
                                <label htmlFor="lastname">Last Name</label>
                                <InputText id="lastname" type="text" value={newStudent.lastname}

                                           autoFocus
                                           error={lastnameError}
                                           helperText={lastnameError ? 'Please enter a lastname' : ''}
                                           onBlur={() => {
                                               if (!newStudent.lastname) {
                                                   setLastnameError(true);
                                               }
                                           }}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               lastname: event.target.value
                                           })}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="firstname">First Name</label>
                                <InputText id="firstname" type="text" value={newStudent.firstname}
                                           autoFocus
                                           error={firstnameError}
                                           helperText={firstnameError ? 'Please enter a fistname' : ''}
                                           onBlur={() => {
                                               if (!newStudent.firstname) {
                                                   setFirstnameError(true);
                                               }
                                           }}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               firstname: event.target.value
                                           })}/>
                            </div>
                        </div>
                        <div className="p-field-wrapper">
                            <div className="p-field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" type="email" value={newStudent.email}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               email: event.target.value
                                           })}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="login">Login</label>
                                <InputText id="login" type="text" value={newStudent.login}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               login: event.target.value
                                           })}/>
                            </div>
                        </div>
                        <div className="p-field-wrapper">
                            <div className="p-field">
                                <label htmlFor="password">Password</label>
                                <InputText id="password" type="password" value={newStudent.password}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               password: event.target.value
                                           })}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="level">Level</label>
                                <InputText id="level" type="text" value={newStudent.level}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               level: event.target.value
                                           })}/>
                            </div>
                        </div>
                        <div className="p-field-wrapper">
                            <div className="p-field">
                                <label htmlFor="class">Class</label>
                                <InputText id="class" type="text" value={newStudent.class}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               class: event.target.value
                                           })}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="phone">Phone</label>
                                <InputText id="phone" type="text" value={newStudent.phone}
                                           onChange={(event) => setNewStudent({
                                               ...newStudent,
                                               phone: event.target.value
                                           })}/>
                            </div>
                        </div>
                        <div className="p-field-wrapper">
                            <div className="p-field">
                                <label htmlFor="dob">Date of Birth</label>
                                <Calendar id="dob" value={newStudent.dob}
                                          onChange={(event) => setNewStudent({...newStudent, dob: event.value})}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="isPublic">Is Public</label>
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="isPublic" checked={newStudent.isPublic}
                                              onChange={(event) => setNewStudent({
                                                  ...newStudent,
                                                  isPublic: event.checked
                                              })}/>
                                    <label htmlFor="isPublic">Public</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-d-flex p-jc-end buttons ">
                        <Button label="Cancel" className="p-mr-2" onClick={() => setAddStudentDialogVisible(false)}/>
                        <Button label="Add" type="submit"/>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
