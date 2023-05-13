import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import './SeeClub.css';
import moment from "moment/moment";


function SeeClub({ data }) {
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
      trigger={<Icon name="eye" color ="blue" /> }
    >
      <Modal.Header style={{ textAlignLast: 'center' }} > View Club details</Modal.Header>
      <Modal.Content   image>
        <Image size='medium' src={data.image} wrapped />

        <Modal.Description style={{ marginLeft: '-10%' }}
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
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Okay"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SeeClub;
