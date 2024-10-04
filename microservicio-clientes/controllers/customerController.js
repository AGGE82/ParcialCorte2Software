const db = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const customer = await db.Customer.create({ name, email, password: hashedPassword });
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar cliente' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await db.Customer.findOne({ where: { email } });
        if (!customer) return res.status(404).json({ error: 'Cliente no encontrado' });

        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
};
