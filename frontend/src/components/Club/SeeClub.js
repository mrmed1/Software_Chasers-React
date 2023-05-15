import React from 'react';
import {Header, Icon, Image, Modal} from 'semantic-ui-react';
import './SeeClub.css';
import moment from "moment/moment";
import {Button} from "primereact/button";

function SeeClub({data}) {
    const [open, setOpen] = React.useState(false);
    //const today = new Date().toISOString().slice(0, 10);

    const dateStr = data?.dac;
    const dateObj = moment(dateStr).format("YYYY-MM-DD");
    return (
        <Modal


            centered
            size="center"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '25vh',
                background: 'right',
                marginLeft: '20vw',
                textAlignLast: 'center',
                padding: '50px',


            }}

            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button
                icon="pi pi-eye"
                className="p-button-rounded p-button-outlined p-button-success"
            ></Button>}
        >
            <Modal.Header style={{textAlignLast: 'center'}}> View Club details</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={data.image} wrapped/>

                <Modal.Description style={{marginLeft: '-10%'}}
                >
                    <div className="club-details">
                        <Header as='h2'>{data.name}</Header>
                        <p>{data.description}</p>
                        <p><strong>Club Foundation :</strong> {data.dac}</p>
                        <p><strong>Responsible:</strong> {data.responsible.firstname} {data.responsible.lastname}</p>
                        <p><strong>President:</strong> {data.president.firstname} {data.president.lastname}</p>
                        <p><strong>Members:</strong> {data.members.map((m) => m.firstname).join(', ')}</p>
                    </div>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>

                <div style={{display:"flex" ,gap:"20px",justifyContent:"center"}}>
                    <Button label="Cancel" severity="danger" onClick={() => setOpen(false)}/>
                    <Button
                        severity="success"
                        onClick={() => setOpen(false)}
                        label="Submit"
                    />
                </div>
            </Modal.Actions>
        </Modal>
    )
}

export default SeeClub;
