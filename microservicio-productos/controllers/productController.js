const db = require('../models');

exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const product = await db.Product.create({ name, description, price, stock });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear producto' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await db.Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
