const express = require('expressjs')
const codes = require('codes.json')
const app = express()

app.post('/checkCode', (req, res) =>  {
    try{
        if(req.body.toString() in codes){
            codes.splice(codes.indexOf(req.body.toString()),1)
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
            codes.codes.push(req.body.code)
            res.status(200).send("OK")
        } else {
            res.status(401).send("Unauthorized")
        }
    } catch (err) {
        res.status(500).send(err.text)
    }
})