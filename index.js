const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [
    { id: 1,
      username: "testiman",
      name: "john doe",
      dateOfBirth: "1212-12-12",
      address: "asd",
      city: "asd",
      country: "asd",
      email: "testi@testi.com"
    },
    { id: 2,
      username: "testiman",
      name: "john doe",
      dateOfBirth: "1212-12-12",
      address: "asd",
      city: "asd",
      country: "asd",
      email: "testi@testi.com"
    },
    { id: 3,
      username: "testiman",
      name: "john doe",
      dateOfBirth: "1212-12-12",
      address: "asd",
      city: "asd",
      country: "asd",
      email: "testi@testi.com"
    }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/users', (req, res) => {
    res.send(users);
})

app.post('/api/users', (req, res) => {

   const { error } = validateUser(req.body);    
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = {
      id: users.length + 1,
      username: req.body.username,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email
    };
    users.push(user);
    res.send(user);
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('the user was not found');
        return;
    }

    const { error } = validateUser(req.body);    
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    user.username = req.body.username;
    user.name = req.body.name;
    user.dateOfBirth = req.body.dateOfBirth;
    user.address = req.body.address;
    user.city = req.body.city;
    user.country = req.body.country;
    user.email = req.body.email;

    res.send(user);


});

function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).required(),
        name: Joi.string().min(3).required(),
        dateOfBirth: Joi.string().min(3).required(),
        address: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        country: Joi.string().min(3).required(),
        email: Joi.string().min(3).required()
    };

    return Joi.validate(user, schema);

}

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('the user was not found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);

})

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('the user was not found');
    res.send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
