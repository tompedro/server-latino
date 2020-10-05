const express = require('express')
const bodyParser = require('body-parser')
const codes = require('./codes.json')
const fs = require('fs')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/checkCode', (req, res) =>  {
    try{
        if(codes.codes.includes(req.body.code)){
            let c = codes
            c.codes.splice(c.codes.indexOf(req.body.code),1)
            fs.writeFile('./codes.json', JSON.stringify(c), 'utf-8', function(err) {
                if (err) throw err
                console.log('Done!')
            })
            res.status(200).send("OK")
        } else {
            res.status(401).send("Unauthorized")
        }
    } catch (err) {
        res.status(500).send(err.text)
    }
})

app.post('/insertCode', (req, res) => {
    try{
        if(req.body.admin === codes.admin){
            let c = codes
            c.codes.push(req.body.code)
            fs.writeFile('./codes.json', JSON.stringify(c), 'utf-8', function(err) {
                if (err) throw err
                console.log('Done!')
            })
            res.status(200).send("OK")
        } else {
            res.status(401).send("Unauthorized")
        }
    } catch (err) {
        res.status(500).send(err.text)
        throw err
    }
})

app.listen(8000, () => {
    console.log(`Example app listening at http://localhost:8000`)
})