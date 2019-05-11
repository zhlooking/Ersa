const express = require('express')
const path = require('path')

const port = 8080
const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.listen(port, error => {
  if (error) {
    throw error
  }
})

console.log('Server Started')
