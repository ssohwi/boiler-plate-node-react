const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require("./models/User");
const config = require('./config/key');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
// application/json 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.post('/register', async (req, res) => {
    const user = new User(req.body)

    const result = await user.save().then(()=>{
        res.status(200).json({
            success: true
        })
    }).catch((err)=>{
        res.json({ success: false, err })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})