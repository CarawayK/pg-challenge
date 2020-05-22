const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Welcome to your school info!' })
})

app.get('/students', db.getStudents)
app.get('/students/:id', db.getStudentById)
app.get('/grades/:id', db.getStudentGradesById)
app.post('/grades', db.createGrade)
app.post('/students', db.createStudent)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})