import React, { useEffect, useState } from "react"
import "./homepage.css"
import Header from "../Header/header"
import ViewDetailModel from "./ViewDetailModel"
import axios from "axios";
import img1 from "../../images.jpg"
import img2 from "../../delete.svg"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Homepage = ({ setLoginUser, user }) => {
    const [list, setList] = useState([])
    const [item, setItem] = useState({})
    const [view, setView] = useState(false)
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        // clearLocalStorage();
        axios.get("http://localhost:9002/listing", {
            params: {
                user: user._id
            }
        })
            .then(res => {

               
              
                    setList(res.data.userlist);
                   
            })
            .catch(error => {
                console.error("Error:", error.message);
                toast("something goes wrong with Network!");

            });

    }, [view, refetch])
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const filtered = list.filter(item =>
            (item.email && typeof item.email === 'string' && item.email.toLowerCase().includes(searchInput.toLowerCase())) ||
            (typeof item.phone === 'number' && item.phone.toString().includes(searchInput.toLowerCase())) ||
            (item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(searchInput.toLowerCase()))
        );

        setFilteredData(filtered);
    }, [searchInput]);

    const [sortType, setSortType] = useState(null);

    const handleSort = (type) => {
        setSortType(type);
    };

    useEffect(() => {
        let sortedData = [...list];

        switch (sortType) {
            case 'A-Z':
                sortedData.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
                break;
            case 'Z-A':
                sortedData.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1));
                break;

            default:
                break;
        }

        setFilteredData(sortedData);
    }, [sortType]);
    const handleDelete = ({ item }) => {
        setItem(item);
        doDelete();
    }
    const doDelete = async (item) => {
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
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('storedList'));
        if (storedList) {
            setList(storedList);
        }
        const storedSortType = localStorage.getItem('storedSortType');
        if (storedSortType) {

            setSortType(storedSortType);

        }
       
    }, []);

    useEffect(() => {
        localStorage.setItem('storedList', JSON.stringify(list));
        
    }, [list]);

    useEffect(() => {
        localStorage.setItem('storedSortType', sortType);
    }, [sortType]);

    return (
        <div className="homepage">
            <Header user={user} />
            <div className="container">
                <ToastContainer />
                <div style={{ margin: 7, width: "50%", height: "30px" }}>
                    <input
                        type="text"
                        placeholder="Search by email, phone, or name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    marginTop: 4,
                    alignItems: "center"
                }}>
                    <div style={{ display: "flex", marginLeft: 7 }}>Choose Filter :</div>
                    <div style={{ display: "flex", flexDirection: "row", gap: 7 }}>
                        <button onClick={() => handleSort('A-Z')}>A-Z</button>
                        <button onClick={() => handleSort('Z-A')}>Z-A</button>
                    </div>
                </div>
                {
                    filteredData.length > 0 ? <>
                        <div className="cardContainer">
                            {filteredData.map((item) => {
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
                                            <img src={img2} style={{ cursor: "pointer" }} onClick={() => {
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



        </div>

    )
}

export default Homepage