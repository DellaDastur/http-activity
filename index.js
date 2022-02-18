const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var ppl = {
    "jdoe": {},
    "kgurazada": {},
    "flastname": {}
};

// init-passwd
for (var p in ppl) {
    ppl[p].password = btoa(p);
}

app.get('/login', function (req, res) {
    res.sendFile(__dirname+'/login.html');
});

app.get('/login.js', function (req, res) {
    res.sendFile(__dirname+'/login.js');
})
/*
app.get('/forgot-password', function (req, res) {
    res.sendFile(__dirname+'/forgot-password.html');
});

app.get('/forgot-password.js', function (req, res) {
    res.sendFile(__dirname+'/forgot-password.js');
});
*/
app.get('/original-password/:u', function (req, res) {
    res.send(btoa(req.params.u));
});

app.post('/check-credentials', function (req, res) {
    if (!req.body) {
	res.status(400).send('no body');
	return;
    }

    console.log(req.body);
    
    if (!req.body.username) {
	res.status(400).send('Error: no username was given.');
	return;
    }

    if (!req.body.password) {
	res.status(400).send('Error: no password was given.');
	return;
    }

    if (!ppl[req.body.username] || !ppl[req.body.username].password) {
	res.status(400).send('Error: user not found.');
    }
    
    const ret = ppl[req.body.username].password === req.body.password ?
	  "Congratulations, your credentials are correct!" :
	  "Unfortunately, your credentials are incorrect.";
    res.send(ret);
});

app.post('/change-password', function (req, res) {
    if (!req.body) {
	res.status(400).send('no body');
        return;
    }

    if (!req.body.username) {
	res.status(400).send('Error: no username was given.');
    }

    if (!req.body.password) {
	res.status(400).send('Error: no password was given.');
    }

    if (!ppl[req.body.username] || !ppl[req.body.username].password) {
        res.status(400).send('Error: user not found.');
    }
    
    ppl[req.body.username].password = req.body.password;
    res.sendStatus(200);
});

const port = 2000;
app.listen(port, function () {
    console.log("listening on " + port);
});
