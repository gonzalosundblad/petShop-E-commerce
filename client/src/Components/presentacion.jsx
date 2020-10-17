import React, { useState } from 'react'
import NavBar from '../Containers/NavBar'



export default function Presentacion() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
    <NavBar/>

    </div>
  );
}

