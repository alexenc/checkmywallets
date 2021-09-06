const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

//Create server
const app = express()

connectDB()

app.use(cors())

app.use(express.json({extended: true}))

const port = process.env.PORT || 3001

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/wallets', require('./routes/wallets'));
app.use('/api/auth', require('./routes/auth'));


app.listen(port, '0.0.0.0', () => {
    console.log(`server running on port ${port}`)
})