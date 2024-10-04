const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const db = require('./models'); // Sequelize models

const app = express();
app.use(bodyParser.json());
app.use('/productos', productRoutes);

db.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log('Microservicio de Productos corriendo en el puerto 3002');
    });
});
