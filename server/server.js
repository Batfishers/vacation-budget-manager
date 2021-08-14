const express = require('express');
const app = express();
const path = require('path');



app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req,res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000);