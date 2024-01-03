import React from 'react';
import {AppBar, Tab, Tabs, Toolbar, Typography} from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [value,setValue]=useState();
  return (
    <div>
<AppBar
sx={{backgroundColor:'#232F3D'}}

position="sticky">
    <Toolbar>
    
        <Tabs
        sx={{ml:'auto'}}
         textColor='inherit'
          indicatorColor="secondary"
           value={value} 
           onChange={(e,val)=>setValue(val)}
           >
            <Tab  LinkComponent={NavLink} to="/add" label='Add Users'/>
{/*             
            <Tab   LinkComponent={NavLink} to="/books" label='Books'/>
            <Tab    LinkComponent={NavLink} to="/about"label='About us'/> */}

        </Tabs>
    </Toolbar>
    

</AppBar>
    </div>
  )
}

export default Header