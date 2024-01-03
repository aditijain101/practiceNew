import React, { useState } from "react"
import "../register/register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { Button, FormGroup } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddUser = ({userData}) => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: 0
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const addNew = () => {
        const { name, email, phone } = user
        if (name && email && phone ) {
            axios.post("http://localhost:9002/addUser", {
                ...user,
                user: userData._id
            })
                .then(res => {
                    alert(res.data.message)
                    history.push("/")
                })
        } else {
            alert("invlid input")
        }

    }
    const handelClose = () => {
        history.push("/")

    }


    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Add New user</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name*" onChange={handleChange} required={true}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email*" onChange={handleChange} required={true}></input>

            <input
                type="tel"
                name="phone"
                value={user.phone}
                placeholder="Contact Number*"
                pattern="[0-9]*"
                onChange={handleChange}
                required={true}
            />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Button className="button" onClick={addNew} >Save</Button>
                <Button className="button" onClick={handelClose} >Cancel</Button>

            </div>


        </div>
    )
}

export default AddUser