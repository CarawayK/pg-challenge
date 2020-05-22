const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// let result = students
// if (req.query.name) {
//   // process a query
//   const selectedStudent = students.filter(student => student.studentName === req.query.name)
//   result = selectedStudent
// }
// res.send(result);

const getStudents = (request, response) => {
  if (request.query.name) {
    pool.query('SELECT * FROM students WHERE name = $1', [request.query.name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })  
  } else {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const getStudentById = (request, response) => {
  const id = request.params.id

  pool.query('SELECT * FROM students WHERE studentid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getStudentGradesById = (request, response) => {
  const id = request.params.id

  pool.query('SELECT * FROM grades WHERE studentid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createStudent = (request, response) => {
  const { id, name, email } = request.body

  pool.query('INSERT INTO students (studentid, name, email) VALUES ($1, $2, $3)', [id, name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId} \n`)
  })
}

const createGrade = (request, response) => {
  const { id, subject, grade } = request.body
  let studentid = parseInt(id)

  pool.query('INSERT INTO grades (studentid, subject, grade) VALUES ($1, $2, $3)', [studentid, subject, grade], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId} \n`)
  })
}

module.exports = {
  getStudents,
  getStudentById,
  getStudentGradesById,
  createStudent,
  createGrade
}

