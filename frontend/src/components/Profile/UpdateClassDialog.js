import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UpdateClassDialog({ open, onClose, onSave, person }) {
  console.log('person',person);
  const [inputValue, setInputValue] = React.useState('');
 

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if(person.level==='3')
    {
      const updatedPerson = {
        ...person,
        role: 'ALUMNI'
      };
      console.log('person',updatedPerson);
      onSave(updatedPerson);
    }else{

      console.log('person before update',person);
    const updatedPerson = {
      ...person,
      level: parseInt(person.level) + 1
    };
    console.log('person afterr update',updatedPerson);
    onSave(updatedPerson);

  }
 
  handleClose();
  };
  

  const handleClose = () => {
    onClose();
    setInputValue('');
  };

  const isConfirmButtonDisabled = inputValue !== `${person.level}${person.class}`;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to confirm that you passed the year?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth={true}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Type your last class "${person.level}${person.class}" to confirm`}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={isConfirmButtonDisabled}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
