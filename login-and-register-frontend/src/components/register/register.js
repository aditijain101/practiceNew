import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { FormGroup } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        gender: "",
        phone: 0
    })
    const [city, setCity] = React.useState('');

    const handleCity = (event) => {
        setCity(event.target.value);
    };

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword,phone } = user
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    alert(res.data.message)
                    history.push("/login")
                })
        } else {
            alert("invlid input")
        }

    }

    const States = [
        { label: 'Gujarat' },
        { label: 'Maharashtra' },
        { label: 'Karnataka' },]
    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name*" onChange={handleChange} required={true}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email*" onChange={handleChange} required={true}></input>
            <div style={{ display: "flex", flexDirection: "row", gap: 4, margin: 4 }}>
                <div>Gender* :</div>
                <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={user.gender === 'male'}
                    onChange={handleChange}

                />
                <label htmlFor="male">Male</label>

                <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={user.gender === 'female'}
                    onChange={handleChange}
                />
                <label htmlFor="female">Female</label>

                {/* Add other options if needed */}
            </div>
            
            <input
                type="tel"
                name="phone"
                value={user.phone}
                placeholder="Contact Number*"
                pattern="[0-9]*"
                onChange={handleChange}
                required={true}
            />
            <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", }}>
                <div>How did you hear about this?* </div>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="LinkedIn, Friends" />

                </FormGroup>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "space-between", margin: 3 }}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">City*</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={city}
                            label="City*"
                            onChange={handleCity}
                        >
                            <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                            <MenuItem value={"Pune"}>Pune</MenuItem>
                            <MenuItem value={"Ahmedabad"}>Ahmedabad</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={States}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="State*" />}
                />
            </div>
            <input type="password" name="password" value={user.password} placeholder="Your Password*" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password*" onChange={handleChange}></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register