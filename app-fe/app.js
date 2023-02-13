const express=require('express')
const bodyParser=require('body-parser')
const axios=require('axios')

const beEndpoint=process.env.beEndpoint || "http://localhost:3500/v1.0/invoke/quote-bo/method/update"

const app=express()

app.use('/static', express.static('static'))
app.use(bodyParser.json({ type: 'application/*+json' }));

app.post('/quote', bodyParser.json(), (req, res)=>{
    console.log(req.body)
    axios.post(beEndpoint, req.body).then(plRes=>{
        console.log(plRes.data)
        res.json({status: 'success', data: plRes.data})
    }).catch(e=>{
        console.log(e)
        res.json({status: 'failed'})
    })
})

app.get('/dapr/subscribe', (req, res)=>{
    res.json([{'pubsubname': 'eventpubsub', 'topic': 'alert', 'route': 'alert'}])
})

app.post('/alert', (req, res)=>{
    console.log(req)
    console.log("B: ", req.body);
    res.json({'success': true})
})

const PORT=process.env.PORT || 80

app.listen(PORT, ()=>{
    console.log("Server started at port " + PORT)
})