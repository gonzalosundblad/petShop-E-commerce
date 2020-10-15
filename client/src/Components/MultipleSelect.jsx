import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/input';
import InputLabel from '@material-ui/core/inputLabel';
import MenuItem from '@material-ui/core/menuItem';
import FormControl from '@material-ui/core/formControl';
import ListItemText from '@material-ui/core/listItemText';
import Select from '@material-ui/core/select';
import Checkbox from '@material-ui/core/checkbox';
// import Chip from '@material-ui/core/Chip';
import { Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect( {user, names }) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [personID, setPersonID] = React.useState([]);
  
  const handleChange = (event) => {
    console.log(event.target)
    setPersonName(event.target.value);
    // setPersonName(event.target.name)
  };

  function AddCategory(){
    if(personName.length > 0){
      console.log(personName)
      personName.map( category => {
        axios.post(`http://localhost:3001/products/${user}/category/${category}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
          .catch(err => console.log(err))
      })
    }
  }
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    console.log(event.target)
    const value = [];
    const idvalue = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        idvalue.push(i)
        console.log(i)
      }
    }
    setPersonName(value);
    setPersonID(idvalue)
  };

  return (
    <div>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          name={personID}
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
           
                    
          { names.map((name) => {
            if (name.name !== 'Sin Categoria'){
              return (
              <MenuItem key={name.name} value={name.name} >
                <Checkbox checked={personName.indexOf(name.name) > -1} />
                <ListItemText primary={name.name}  />
              </MenuItem> )
            }
          }
          )}
          
        </Select>
      <Button  variant="primary" type="button" onClick={(e) => AddCategory(e)}>
        Add Categories
      </Button>
      </FormControl>
      
    </div>
  );
}
