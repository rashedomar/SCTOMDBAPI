const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const port = 3020;
app.use(bodyParser.json());

const url = 'http://www.omdbapi.com/?&type=movie&'
const apikey = '&apikey=eb498424'


app.post('/search',(req,res) => {
    console.log(req.body);
    var Surl = url   + 's=' + req.body.text + '&page=' + req.body.page + apikey; 
    console.log(Surl)
    http.get(Surl , (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    res.send(data);
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
});

app.post('/getMovieDetails',(req,res) => {


    console.log(req.body);
    var Surl = url   + 'i=' + req.body.id +  apikey; 
    console.log(Surl)
    http.get(Surl , (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    res.send(data);
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});



});



app.listen(port, () => console.log(`server app listening on port ${port}!`))
