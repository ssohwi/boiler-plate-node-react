const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { auth } = require('./server/middleware/auth');
const { User } = require("./server/models/User");
const config = require('./server/config/key');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
// application/json 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.get('/api/hello', (req,res) => {
    res.send("안녕하세요!")
})

app.post('/api/users/register', async (req, res) => {
    const user = new User(req.body)

    await user.save().then(()=>{
        res.status(200).json({
            success: true
        })
    }).catch((err)=>{
        res.json({ success: false, err })
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                    if (!isMatch)
                        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

                    user.generateToken((err, user) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).send(err);
                        }

                        res.cookie("x_auth", user.token)
                            .status(200)
                            .json({loginSuccess: true, userId: user._id})

                    })
                })
        })
        .catch((err) => {
            if (err) return res.status(400).send(err);
        })
})

app.get('/api/users/auth', auth,  (req, res) =>  {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role !== 0,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token : ""})
        .then(user => {
            return res.status(200).send({
                success: true
            })
        })
        .catch(err => {
            console.log(err);
            return res.json({success: false, err});
        })
})

const port = 3030
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})