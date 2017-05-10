const express = require('express');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/:fileName', (req, res, next) => {
  const param = req.query.q;

   var options = {
        headers: {
            'Content-Type': 'application/json',
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.fileName;
    console.log(fileName);
    res.status(200).sendFile(__dirname + '/data/' + fileName + '.json', options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});