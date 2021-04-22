const express = require("express");
const mongoos = require("mongoose");
const bodyParser = require("body-parser");
const Users = require("./mongo/users");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/signup", (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  let password = req.body.password.trim();
  const bitCoinAccountAddress = req.body.bitCoinAccountAddress.trim();

  if (email === "") {
    res.send(JSON.stringify({ msg: "Email is required" }));
  } else if (password === "") {
    res.send(JSON.stringify({ msg: "Password is required" }));
  } else if (bitCoinAccountAddress === "") {
    res.send(JSON.stringify({ msg: "BitCoin's address is required" }));
  } else {
    Users.findOne({
      email: email,
    }).then((emailFound) => {
      if (emailFound)
        res.send(JSON.stringify({ status: 202, msg: "Email already exist." }));
      else {
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err)
              throw "====>>>> ERROR while getting hash for password =>" + err;
            password = hash;

            Users.create({
              email: email,
              password: password,
              bitCoinAccountAddress: bitCoinAccountAddress,
            })
              .then((user) => {
                res.send(JSON.stringify({ status: 200, msg: user }));
              })
              .catch((err) => {
                res.send(JSON.stringify({ status: 201, msg: err }));
              });
          })
        );
      }
    });
  }
});

app.post("/api/login", (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password.trim();

  if (email === "") {
    res.send(JSON.stringify({ msg: "Email is required" }));
  } else if (password === "") {
    res.send(JSON.stringify({ msg: "Password is required" }));
  } else {
    Users.findOne({
      email: email,
    })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((isMatched) => {
            if (isMatched) {
              res.send(JSON.stringify({ status: 200, data: user }));
            } else {
              res.send(
                JSON.stringify({ status: 202, msg: "Incorrect Password" })
              );
            }
          });
        } else {
          res.send(JSON.stringify({ status: 404, msg: "User not found" }));
        }
      })
      .catch((err) => {
        res.send(JSON.stringify({ msg: err }));
      });
  }
});

// db connection string
const db = require("./config/keys").mongoURL;

// connect to db
mongoos
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mognoDb connected successfully ");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 5050;
//run app
app.listen(port, () => console.log(`running MY app at port ${port} `));
