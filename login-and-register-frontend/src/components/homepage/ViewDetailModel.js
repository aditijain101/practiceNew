import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Edit from "../../Edit code.svg"
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ view, setView, item, setItem }) {
  const [edit, setEdit] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);
  const handleNameChange = (event) => {
    // Update the 'name' property in the 'item' state when the input changes
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleEdit = () => {
    let userData = {
      name: item.name,
      phone: item.phone,
      email: item.email
    }
    axios.put("http://localhost:9002/edit", {
      user: userData,
      id: item._id
    })
      .then(res => {
        // alert(res.data.message)
        // history.push("/")
      })

    setEdit(false);
    setView(false)
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={view}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            edit ? <>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label>Name :</label>
                <input type="text" name="name" value={item.name} onChange={handleNameChange} ></input>
                <label>Email : </label>
                <input type="text" name="email" value={item.email} placeholder="Your Email*" onChange={handleNameChange} ></input>
                <label>Contact Number : </label>
                <input
                  type="tel"
                  name="phone"
                  value={item.phone}
                  pattern="[0-9]*"
                  onChange={handleNameChange}
                />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                  <Button className="button" variant='contained' color='secondary' onClick={handleEdit}>Save</Button>
                  <Button className="button" variant='contained' color='secondary' onClick={() => {
                    setEdit(false);
                    setView(false);
                  }} >Cancel</Button>

                </div>
              </div>


            </> : <>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <p>Name :</p>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {item.name}
                  </Typography>
                </div>
                <img src={Edit} onClick={() => setEdit(true)} />
              </div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Email : {item.email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Contact Number : {item.phone}
              </Typography>
            </>
          }

        </Box>
      </Modal>
    </div>
  );
}