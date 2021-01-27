const route = require('express').Router();
const path = require('path');

route.get('/', async (req, res)=>{
    const myData = await path.join(__dirname, '../db', 'data.json');
    res.status(200).sendFile(myData)
})
module.exports = route;