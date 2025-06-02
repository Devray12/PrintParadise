const fs = require('fs');
const path = require('path');

// Read the template file
const template = fs.readFileSync('product-template.html', 'utf8');

// Create products directory if it doesn't exist
const productsDir = 'products';
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir);
}

// Read the products data
const mainJs = fs.readFileSync('js/main.js', 'utf8');
const productsMatch = mainJs.match(/const products = (\[[\s\S]*?\]);/);
const productsData = eval(productsMatch[1]);

// Generate individual product pages
productsData.forEach(product => {
    const productPage = template;
    const fileName = `product.html`;
    fs.writeFileSync(fileName, productPage);
    console.log(`Generated ${fileName}`);
});

console.log('Product pages generation complete!'); 