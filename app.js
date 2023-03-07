const express = require('express');
const bodyParser = require('body-parser');
var Cors = require('cors');
const app = express();


const expanseRoutes = require('./routes/Expanse');
const sequelize = require('./utils/database');


app.use(bodyParser.json({extended:false}));
app.use(expanseRoutes);
app.use(Cors({}));

sequelize.sync()
.then(()=>{
    app.listen(5000);
}
)