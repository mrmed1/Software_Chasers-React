import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {CreateStudent, DeleteStudent, GetAllStudents, UpdateStudent} from "../../Service/etudiant.service";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Calendar} from "primereact/calendar";
import {Checkbox, FormControlLabel, Switch} from "@mui/material";
import './ListEtudiant.css';
import toast, {Toaster} from "react-hot-toast";
import DetailsDialog from './DetailsDialog';

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
    const [phoneError, setPhoneError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [touched, setTouched] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
 
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
    const [isPublicChecked, setIsPublicChecked] = useState(false);
    const queryClient = useQueryClient();

    const {isLoading, isError, data: students, error} = useQuery('students', GetAllStudents, {
        retry: false, refetchOnWindowFocus: false
    });

    const updateStudentMutation = useMutation((updatedStudent) => {
        return UpdateStudent(updatedStudent);
    }, {
        onSuccess: () => {
            toast.success('Student Updated Successfully');
            // Invalidate the 'students' query to refetch the latest data
            queryClient.invalidateQueries('students');
        }, onError: (error) => {
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
        }, onError: (error) => {
            toast.error('Error in Adding Student', error);
        }
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const header = (<div className="flex flex-wrap align-items-center justify-content-between gap-2" style={{display:"flex", justifyContent:'flex-end'}}>
        <Button label="Add Student" data-test="add-btn" onClick={() => {
            setAddStudentDialogVisible(true)
        }}/>
    </div>);
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
    const handleIsPublicChange = (event) => {
        setIsPublicChecked(!isPublicChecked);

    };
    /**this Section for delete Student**/
    const confirmDeleteStudent = (student) => {
        setSelectedStudent(student);
        setDeleteStudentDialog(true);
    };

    const deleteStudentDialogFooter = (<>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text"
                onClick={() => setDeleteStudentDialog(false)} id="delete-btn" />
        <Button label="Delete" icon="pi pi-trash" className="p-button-text" data-test="delete-confirm-btn"
                onClick={() => deleteStudentMutation.mutate(selectedStudent._id)} autoFocus/>
    </>);

    const actionBodyTemplate = (rowData) => {
        return (<>
            <Button icon="pi pi-trash" rounded outlined severity="danger" data-test={`delete-btn-${rowData._id}`}
                    onClick={() => confirmDeleteStudent(rowData)}/>
        </>);
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

            return (
                <React.Fragment>
                    <Button icon="pi pi-check" rounded outlined  onClick={rowEditor.onSaveClick}  data-test={`save-edit-btn-${rowData._id}`}/>
                    <Button icon="pi pi-times" rounded outlined className="p-ml-2" onClick={rowEditor.onCancelClick} />
                </React.Fragment>
            );
        } else {
         
            // custom init element
            return (<React.Fragment>
                    <Button icon="pi pi-pencil" rounded outlined data-test={`edit-btn-${rowData._id}`} onClick={rowEditor.onInitClick}/>
                </React.Fragment>

            )
        }
    }

    const textEditor = (options) => {
        console.log(options)
        if (options.field === 'dob') {

            return <Calendar data-test={`edit-${options.field}-${options.rowData._id}`}
                             value={new Date(options.value)}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        } else {

            return <InputText data-test={`edit-${options.field}-${options.rowData._id}`} type="text" value={options.value}
                              onChange={(e) => options.editorCallback(e.target.value)}/>;
        }

    };
    const handleRowClick = (data) => {
 
    setSelectedStudent(data);
    console.log(data)
   
        setOpenDetailsDialog(true);
 
       
    
      };
    return (<div >
        <Toaster/>
        {selectedStudent && (
        <DetailsDialog
            open={openDetailsDialog}
            onClose={() => {
              setOpenDetailsDialog(false);
            }}
            selectedData={selectedStudent}
           
          />)}
        <h2>List of students</h2>
        <div className="datatable-container" >
            <DataTable value={students} style={{ width: '100%', overflowX: 'scroll' }} editMode="row" selectionMode="single" header={header}
                       onRowEditComplete={onRowEditComplete} dataKey="_id" selection={selectedStudent}
                       responsive={true}
                       onRowClick={(e) => handleRowClick(e.value)}
                       onSelectionChange={(e) => {setSelectedStudent(e.value)
                       
                       }}>
                <Column header="#" headerStyle={{width: '3rem'}}
                        body={(data, options) => options.rowIndex + 1}></Column>
                <Column field="lastname" header="Last Name" editor={(options) => textEditor(options)}
                        style={{width: '20%'}} data-test='lastname'></Column>
                <Column field="firstname" header="First Name" editor={(options) => textEditor(options)}
                        style={{width: '20%'}} ></Column>
                <Column field="email" header="Email" editor={(options) => textEditor(options)}
                        style={{width: '20%'}} ></Column>
                <Column field="level" header="Level" editor={(options) => textEditor(options)}
                        style={{width: '20%'}} ></Column>
                <Column field="class" header="Class" editor={(options) => textEditor(options)}
                        style={{width: '20%'}} ></Column>
                <Column field="phone" header="Phone" editor={(options) => textEditor(options)}
                        style={{width: '20%'}} ></Column>
                <Column field="dob" header="Date of Birth" body={dateTemplate} editor={(options) => textEditor(options)}
                        style={{width: '20%'}} ></Column>
                <Column className="mr-2" rowEditor body={rowEditorTemplate}></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
        <Dialog visible={deleteStudentDialog} header="Confirmation" modal style={{width: '350px'}}
                footer={deleteStudentDialogFooter} onHide={() => setDeleteStudentDialog(false)}>
            <div className="p-d-flex p-ai-center">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                <span>Are you sure you want to delete this student?</span>
            </div>
        </Dialog>

        <Dialog   header="Add Student" visible={addStudentDialogVisible}
                  onHide={() => setAddStudentDialogVisible(false)} style={{width: "50%"}}>
            <form onSubmit={handleSubmit}>
                <div className="p-fluid">

                    <div className="p-field-wrapper">
                        <div className="p-field">
                            <label htmlFor="lastname">Last Name</label>
                            <InputText
                                id="lastname"
                                data-test="add-lastname"
                                type="text"
                                value={newStudent.lastname}
                                className={lastnameError && !newStudent.lastname ? 'p-invalid' : ''}
                                error={lastnameError}
                                helperText={lastnameError ? 'Please enter a lastname' : ''}
                                onBlur={() => {
                                    if (!newStudent.lastname) {
                                        setLastnameError(true);
                                    }
                                }}
                                onChange={(e) => {
                                    setNewStudent({...newStudent, lastname: e.target.value});
                                    setLastnameError(false);
                                }}
                            />

                            <span className="error-message">
                                    {lastnameError && 'Please enter a lastname'}
                                </span>
                        </div>
                        <div className="p-field">
                            <label htmlFor="firstname">First Name</label>
                            <InputText
                                id="firstname"
                                data-test="add-firstname"
                                type="text"
                                value={newStudent.firstname}
                                className={firstnameError && !newStudent.firstname ? 'p-invalid' : ''}
                                error={firstnameError}
                                helperText={firstnameError ? 'Please enter a Firstname*' : ''}
                                onBlur={() => {
                                    if (!newStudent.firstname) {
                                        setFirstnameError(true);
                                    }
                                }}
                                onChange={(e) => {
                                    setNewStudent({...newStudent, firstname: e.target.value});
                                    setFirstnameError(false);
                                }}
                            />

                            <span className="error-message">
                                    {firstnameError && 'Please enter a Firstname*'} {/* show the error message */}
                                </span>
                        </div>
                    </div>
                    <div className="p-field-wrapper">
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                type="email"
                                data-test="add-email"
                                value={newStudent.email}
                                className={emailError && !newStudent.email ? 'p-invalid' : ''}
                                error={emailError}
                                helperText={emailError ? 'Please enter a Email*' : ''}
                                onBlur={() => {
                                    if (!newStudent.email) {
                                        setEmailError(true);
                                    }
                                }}
                                onChange={(e) => {
                                    setNewStudent({ ...newStudent, email: e.target.value });
                                    setEmailError(false);
                                }}
                            />

                            <span className="error-message">
                                    {emailError && 'Please enter a Email*'}
                                </span>
                        </div>
                        <div className="p-field">
                            <label htmlFor="login">Login</label>
                            <InputText id="login"
                                       type="text"
                                       data-test="add-login"
                                       value={newStudent.login}
                                       className={loginError && !newStudent.login ? 'p-invalid' : ''}
                                       error={loginError}
                                       helperText={loginError ? 'Please enter a Login*' : ''}
                                       onBlur={() => {
                                           if (!newStudent.login) {
                                               setLoginError(true);
                                           }
                                       }
                                       }
                                       onChange={(event) => {
                                           setNewStudent({...newStudent, login: event.target.value});
                                           setLoginError(false);
                                       }}/>
                            <span className="error-message">
                                    {loginError && 'Please enter a Login*'}
                                </span>
                        </div>
                    </div>
                    <div className="p-field-wrapper">
                        <div className="p-field">
                            <label htmlFor="password">Password</label>
                            <InputText id="password"
                                       type="password"
                                       data-test="add-password"
                                       value={newStudent.password}
                                       className={passwordError && !newStudent.password ? 'p-invalid' : ''}
                                       error={passwordError}
                                       helperText={passwordError ? 'Please enter a Password*' : ''}
                                       onBlur={() => {
                                           if (!newStudent.password) {
                                               setPasswordError(true);
                                           }
                                       }
                                       }
                                       onChange={(event) => {
                                           setNewStudent({...newStudent, password: event.target.value});
                                           setPasswordError(false);
                                       }}/>
                            <span className="error-message">
                                    {passwordError && 'Please enter a Password*'}
                                </span>
                        </div>
                        <div className="p-field">
                            <label htmlFor="level">Level</label>
                            <InputText id="level"
                                       type="text"
                                        data-test="add-level"
                                       value={newStudent.level}
                                       className={levelError && !newStudent.level ? 'p-invalid' : ''}
                                       error={levelError}
                                       helperText={levelError ? 'Please enter a Level*' : ''}
                                       onBlur={() => {
                                           if (!newStudent.level) {
                                               setLevelError(true);}
                                       }
                                       }
                                       onChange={(event) => {
                                           setNewStudent({...newStudent, level: event.target.value});
                                           setLevelError(false);
                                       }}
                            />
                            <span className="error-message">
                                    {levelError && 'Please enter a Level*'}
                                </span>
                        </div>
                    </div>
                    <div className="p-field-wrapper">
                        <div className="p-field">
                            <label htmlFor="class">Class</label>
                            <InputText id="class"
                                       type="text"
                                        data-test="add-class"
                                       value={newStudent.class}
                                       className={classError && !newStudent.class ? 'p-invalid' : ''}
                                       error={classError}
                                       helperText={classError ? 'Please enter a Class*' : ''}
                                       onBlur={() => {
                                           if (!newStudent.class) {
                                               setClassError(true);}
                                       }   }
                                       onChange={(event) => {
                                           setNewStudent({...newStudent, class: event.target.value});
                                           setClassError(false);
                                       }}
                            />
                            <span className="error-message">
                                    {classError && 'Please enter a Class*'}
                                </span>

                        </div>
                        <div className="p-field">
                            <label htmlFor="phone">Phone</label>
                            <InputText id="phone"
                                       type="text"
                                        data-test="add-phone"
                                       value={newStudent.phone}
                                       className={phoneError && !newStudent.phone ? 'p-invalid' : ''}
                                       error={phoneError}
                                       helperText={phoneError ? 'Please enter a Phone*' : ''}
                                       onBlur={() => {
                                           if (!newStudent.phone) {
                                               setPhoneError(true);}
                                       }    }
                                       onChange={(event) => {
                                           setNewStudent({...newStudent, phone: event.target.value});
                                           setPhoneError(false);
                                       }}


                            />
                            <span className="error-message">
                                    {phoneError && 'Please enter a Phone*'}
                                </span>
                        </div>
                    </div>
                    <div className="p-field-wrapper">
                        <div className="p-field">
                            <label htmlFor="dob">Date of Birth</label>
                            <Calendar id="dob"
                                      data-test="add-dob"
                                      value={newStudent.dob}
                                      className={dobError && !newStudent.dob ? 'p-invalid' : ''}
                                      error={dobError}
                                      helperText={dobError ? 'Please enter a Date of Birth*' : ''}
                                      onBlur={() => {
                                          if (!newStudent.dob) {
                                              setDobError(true);}
                                      }   }
                                      onChange={(event) => {
                                          setNewStudent({...newStudent, dob: event.value});
                                          setDobError(false);
                                      }   }
                            />
                            <span className="error-message">
                                    {dobError && 'Please enter a Date of Birth*'}
                                </span>
                        </div>
                        <div className="p-field ">

                            <div className="p-field-checkbox " style={{marginTop: 20 + 'px'}}>
                                <FormControlLabel
                                    data-test="add-ispublic"
                                    control={<Checkbox value={isPublicChecked}  checked={newStudent.isPublic} onChange={() => {
                                        setIsPublicChecked(!isPublicChecked);
                                        setNewStudent({...newStudent, isPublic: !isPublicChecked});
                                    }} color="primary" />}
                                    label="Is Public"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-d-flex p-jc-end buttons ">
                    <Button label="Cancel" className="p-mr-2" onClick={() => setAddStudentDialogVisible(false)}/>
                    <Button label="Add" data-test='add-submit' type="submit"/>
                </div>
            </form>
        </Dialog>
    </div>);
}