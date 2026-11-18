const http = require('http');
const PORT = 3000;

let products = 'ID: 201, Name: Wireless Mouse, Price: 599, Category: Electronics';

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/plain');

    if (req.method === 'GET' && req.url === '/products') {
        res.statusCode = 200;
        res.end('Products: ' + products);
    }

    else if (req.method === 'POST' && req.url === '/products') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            products=body;
            res.statusCode = 201;
            res.end('Product added successfully: ' + body);
        });
    }

    else if (req.method === 'PUT' && req.url === '/products') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            products = body;
            res.statusCode = 200;
            res.end('Products updated successfully: ' + products);
        });
    }

    else if (req.method === 'DELETE' && req.url === '/products') {

        products = '';
        res.statusCode = 200;
        res.end('All products deleted successfully');
    }

    else {
        res.statusCode = 404;
        res.end('Route not found');
    }

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});