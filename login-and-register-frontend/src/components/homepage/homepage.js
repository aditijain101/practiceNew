import React, { useEffect, useState } from "react"
import "./homepage.css"
import Header from "../Header/header"
import ViewDetailModel from "./ViewDetailModel"
import axios from "axios";
import img1 from "../../images.jpg"
import img2 from "../../delete.svg"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

const Homepage = ({ setLoginUser, user }) => {
    console.log('====================================');
    console.log("homepage user", user);
    console.log('====================================');
    const [list, setList] = useState([])
    const [item, setItem] = useState({})
    const [view, setView] = useState(false)
    const [refetch, setRefetch] = useState(false)
    useEffect(() => {

        axios.get("http://localhost:9002/listing", {
            params: {
                user: user._id
            }
        })
            .then(res => {
                // alert(JSON.stringify(res.data));
                setList(res.data.userlist)
                // history.push("/login")
            })
            .catch(error => {
                console.error("Error:", error.message);
                // Handle error if needed
            });

    }, [view,refetch])
    const handleDelete = ({item}) =>{
        setItem(item);
        doDelete();
    }
    const doDelete = async(item) =>{
        try {
            const response = await axios.delete(`http://localhost:9002/delete/${item._id}`);
        
            if (response.status === 200) {
              console.log('User deleted successfully:', response.data.message);
              setRefetch(!refetch)
            } else if (response.status === 404) {
              console.log('User not found');
            } else {
              console.error('Error deleting user:', response.data.error);
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }
   
    return (
        <div className="homepage">
            <Header user={user} />
            <div className="container">
                {
                    list.length > 0 ? <>
                        <div className="cardContainer">
                            {list.map((item) => {
                                return (
                                    <Card sx={{ manWidth: 275 }}>
                                        <CardContent>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {item.name}
                                                </Typography>

                                            </div>
                                            <Typography variant="body2">
                                                {item.email}
                                            </Typography>
                                            <Typography variant="body2">
                                                {item.phone}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => {
                                                setItem(item)
                                                setView(true)
                                            }}>View Detail</Button>
                                            <img src={img2} style={{ cursor: "pointer" }} onClick={()=>{
                                                 setItem(item);
                                                 doDelete(item);

                                            }} />
                                        </CardActions>
                                    </Card>
                                )

                            })}
                            <ViewDetailModel
                                view={view}
                                setView={setView}
                                item={item}
                                setItem={setItem} />

                        </div>
                    </> : <>
                        <div style={{ alignItems: "center", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img src={img1} />
                            No data
                        </div>
                    </>
                }
            </div>
            {/* <h1>Hello Homepage</h1> */}
            {/* <div className="button" onClick={() => setLoginUser({})} >Logout</div> */}
        </div>
    )
}

export default Homepage