
import Product from '../models/product.model';

module.exports = {

    createProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProductById: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.status(200).json(product);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteProductById: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(404).json({ message: 'product not found' });
            }

            res.status(200).json({ message: "product deleted successfully" })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    sseTest: async (req, res) => {
        try {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            // Helper function to send events
            const sendEvent = (data) => {
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            };

            // Example: send a message every second
            let count = 0;
            const intervalId = setInterval(() => {
                sendEvent({ message: `Event number ${count}` });
                count += 1;
            }, 1000);

            // Clean up when the client closes the connection
            req.on('close', () => {
                clearInterval(intervalId);
                res.end();
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    },
}