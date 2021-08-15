import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        {props.option}
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id= 'Select Tag'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem id= {props.id} value={1}>One</MenuItem>
          <MenuItem id= {props.id} value={2}>Two</MenuItem>
          <MenuItem id= {props.id} value={3}>Three</MenuItem>
          <MenuItem id= {props.id} value={4}>Four</MenuItem>
          <MenuItem id= {props.id} value={5}>Five</MenuItem>
          <MenuItem id= {props.id} value={6}>Six</MenuItem>
          <MenuItem id= {props.id} value={7}>Seven</MenuItem>
          <MenuItem id= {props.id} value={8}>Eight</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}
