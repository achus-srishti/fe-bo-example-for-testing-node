const express=require('express')
const bodyParser=require('body-parser')
const axios=require('axios')

const storeEndpoint=process.env.storeEndpoint || "http://localhost:3500/v1.0/state/statestore"

const app=express()


app.post('/update', bodyParser.json(), (req, res)=>{
    console.log(req.body)
    axios.post(storeEndpoint, req.body).then(plRes=>{
        console.log(plRes.data)
        res.json({status: 'success'})
    }).catch(e=>{
        console.log(e)
        res.json({status: 'failed'})
    })
})

app.get('/get/:id', bodyParser.json(), (req, res)=>{
    axios.get(storeEndpoint+"/"+req.params.id)
    .then(payloadRes=>{
        console.log()
        res.json({status: 'success', payload: payloadRes.data})
    }).catch(e=>{
        console.log(e)
        res.json({status: 'failed'})
    })
})


app.post('/publish', bodyParser.json(), (req, res)=>{
    console.log(req.body)
    axios.post('http://localhost:3500/v1.0/publish/eventpubsub/alert', JSON.stringify(req.body))
    .then(pres=>{
        console.log(pres)
        res.json({status: 'success'})
    }).catch(err=>{
        console.log(err)
        res.json({status: 'failed'})
    })
})

const PORT=process.env.PORT || 80

app.listen(PORT, ()=>{
    console.log("Server started at port " + PORT)
})