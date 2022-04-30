const port = 3000
const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()
const https = require("https")
var path = require('path')      
const { response } = require("express")

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const fn = req.body.fname
    const ln = req.body.lname
    const email = req.body.email
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fn,
                    LNAME: ln
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)
    const url = 'https://us14.api.mailchimp.com/3.0/lists/21baf265cd'
    const options = {
        method: "POST", 
        auth: "gopalverma:eb26614692b92e9b1102fed9d7a920a0-us14"
    }
    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html") 
        }
    })
    response.on("data", (data) => {
        console.log(JSON.parse(data))
    })
    request.write(jsonData)
    request.end()
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port number: "+ port)
}) 

//api-key eb26614692b92e9b1102fed9d7a920a0-us14
//audience-id 21baf265cd