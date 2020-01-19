const uuid = require('uuid')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

const { users } = require('./state')
const counter = users.length
/* BEGIN - create routes here */

app.use(bodyParser.json())
app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/:id', (req, res) => {
  const file = parseInt(req.params.id) - 1
  res.send(users[file])
})

app.post('/users/', (req, res) => {
const newUser = {
  id: counter + 1,
  name: req.body.name,
  occupation: req.body.occupation,
  status: "active"
}

if(!newUser.name){
  return res.status(400).json({msg: 'Please enter name.'})
}

users.push(newUser);
res.json(users);
console.log(req.body)
})
//How exactly does UserId work?
// Ask about put and post applications.
// Learn about express router
// Learn CRUD applications in Express
/* END - create routes here */
app.put('/users/:id', (req, res) => {
  const update = users[req.params.id - 1]
  users[req.params.id - 1] = update
  res.send(users[req.params.id - 1])
})

app.delete('/users/:id', (req, res) => {
  // const part = parseInt(users.params.id)
  console.log(req.params.id)
  users[req.params.id - 1].status = "Inactive"
  res.send("deleted")
})

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))