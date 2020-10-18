import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import axios from 'axios';
import postIdProdCatId from '../Redux/actions'



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

export default function MultipleSelect( {user, names, cat}) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [personID, setPersonID] = React.useState([]);
  
  useEffect(() => {
    if(typeof(cat) !== "undefined" && cat[0] !== "Sin Categoria"){
      setPersonName(cat);
      cat=undefined;
    }
  })
  const handleChange = (event) => {
    console.log(event.target)
    setPersonName(event.target.value);
    // setPersonName(event.target.name)
  };
  function AddCategory(){
    if(personName.length > 0){
      console.log(personName)
      personName.map( category => {
        postIdProdCatId(user, category)(`http://localhost:3001/products/${user}/category/${category}`)
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
              <MenuItem key={name.name} value={name.id} >
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
