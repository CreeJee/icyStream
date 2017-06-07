const icy = require('icy'),
    express = require('express'),
    app = express(),
    url = 'http://sc08.saycast.com:8028';
app.get('/',function(req,res,next) {
    res.send('main');
});
app.get('/live',function(req, res, next) {
    res.send('<audio controls autoplay><source src="/live.mp3" type="audio/mpeg"></audio>')
})
app.get('/live.mp3',function(req,res,next) {
    // connect to the remote stream 
    icy.get(url, function (icy_result) {
        var headers = {
            'content-type': 'audio/mpeg',
            'Transfer-Encoding': 'chunked',
        };
        res.writeHead(200, headers);
        icy_result.on('error',function(exception) {
            console.error("Error reading file: ", exception);
        })
        icy_result.on('data',function(r) {
            res.write(r);
        });
        icy_result.on('end',function() {
            res.end();
        })
    });    
});

app.listen(process.env.PORT,process.env.IP,function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});