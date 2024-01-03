import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://abinash185:abinash185@ac-m1t6ht5-shard-00-00.4l3c9gx.mongodb.net:27017,ac-m1t6ht5-shard-00-01.4l3c9gx.mongodb.net:27017,ac-m1t6ht5-shard-00-02.4l3c9gx.mongodb.net:27017/?ssl=true&replicaSet=atlas-vng6wl-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected successfully")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    gender: String,
})
const userListingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    user: String
})

const User = new mongoose.model("User", userSchema)
const userListing = new mongoose.model("userListingSchema", userListingSchema)

//Routes
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Server Error" });
        } else {
            if (user) {
                if (password === user.password) {
                    res.send({ message: "Login Successful", user: user });
                } else {
                    res.status(401).send({ message: "Password didn't match" });
                }
            } else {
                res.status(404).send({ message: "User not found" });
            }
        }
    });
});
app.put("/edit", (req, res) => {
    const { id, user } = req.body;
    userListing.updateOne({ _id: id }, user, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error updating user", error: err });
      } else {
        if (result.nModified > 0) {
          res.status(200).json({ message: "User updated successfully" });
        } 
      }
    });
})
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id; 
  
    userListing.deleteOne({ _id: id }, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
      } else {
        if (result.deletedCount > 0) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    });
  });
app.get("/listing", async (req, res) => {
    try {
       
        const { user } = req.query;
    
        const userlist = await userListing.find({ user: user });
        res.status(200).json({ userlist: userlist });
    } catch (error) {
        // Handle errors if any occurred during the process
        res.status(500).json({ error: error.message });
    }
})
app.post("/addUser", async (req, res) => {
    try {
        const { name, email, phone, user } = req.body;
        const newuser = new userListing({
            name,
            email,

            phone,
            user
        })
        newuser.save(err => {
            if (err) {
                res.send(err)
            } else {
                res.send({ message: "Successfully Registered, Please login now." })
            }
        })
    } catch (error) {
        // Handle errors if any occurred during the process
        res.status(500).json({ error: error.message });
    }
})

app.post("/register", (req, res) => {
    const { name, email, password ,phone,gender} = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password,
                phone,
                gender
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})

app.listen(9002, () => {
    console.log("BE started at port 9002")
})