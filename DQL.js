const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  multipleStatements: true
};

// Function to create the database, tables, and insert sample data
async function setupDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // 1. Create the database
    await connection.query('CREATE DATABASE IF NOT EXISTS yassineDQL');
    console.log('Database "yassineDQL" created or already exists.');

    // Use the database
    await connection.query('USE yassineDQL');

    // 2. Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Customer (
        Customer_id INT AUTO_INCREMENT PRIMARY KEY,
        customer_Name VARCHAR(255) NOT NULL,
        customer_Tel VARCHAR(20) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Product (
        Product_id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        Price DECIMAL(10, 2) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Orders (
        Order_id INT AUTO_INCREMENT PRIMARY KEY,
        Customer_id INT NOT NULL,
        Product_id INT NOT NULL,
        OrderDate DATE NOT NULL,
        quantity INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id),
        FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
      );
    `);
    console.log('Tables created or already exist.');

    // 3. Insert sample data
    await connection.query(`
      INSERT INTO Customer (customer_Name, customer_Tel) VALUES
      ('Yassine Kalthoum', '123456789'),
      ('John Doe', '987654321'),
      ('Jane Smith', '456123789');

      INSERT INTO Product (product_name, category, Price) VALUES
      ('Consultation', 'Medical', 50.00),
      ('Dental Checkup', 'Dental', 80.00),
      ('Eye Exam', 'Optical', 60.00);

      INSERT INTO Orders (Customer_id, Product_id, OrderDate, quantity, total_amount) VALUES
      (1, 1, '2023-10-01', 1, 50.00),
      (2, 2, '2023-10-02', 1, 80.00),
      (3, 3, '2023-10-03', 1, 60.00),
      (1, 2, '2023-10-04', 2, 160.00);
    `);
    console.log('Sample data inserted.');

    // 4. Run queries
    console.log('\n--- Running Queries ---\n');

    // Query 1: Display all customers
    const [customers] = await connection.query('SELECT * FROM Customer');
    console.log('All Customers:', customers);

    // Query 2: Display products with price between 5000 and 10000
    const [products] = await connection.query(`
      SELECT product_name, category
      FROM Product
      WHERE Price BETWEEN 5000 AND 10000
    `);
    console.log('Products (Price 5000-10000):', products);

    // Query 3: Display products sorted by price (descending)
    const [sortedProducts] = await connection.query(`
      SELECT * FROM Product
      ORDER BY Price DESC
    `);
    console.log('Products Sorted by Price (Desc):', sortedProducts);

    // Query 4: Display order statistics
    const [orderStats] = await connection.query(`
      SELECT
        COUNT(*) AS total_orders,
        AVG(total_amount) AS average_amount,
        MAX(total_amount) AS highest_amount,
        MIN(total_amount) AS lowest_amount
      FROM Orders
    `);
    console.log('Order Statistics:', orderStats[0]);

    // Query 5: Number of orders per product
    const [ordersPerProduct] = await connection.query(`
      SELECT Product_id, COUNT(*) AS number_of_orders
      FROM Orders
      GROUP BY Product_id
    `);
    console.log('Orders per Product:', ordersPerProduct);

    // Query 6: Customers with more than 2 orders
    const [frequentCustomers] = await connection.query(`
      SELECT Customer_id
      FROM Orders
      GROUP BY Customer_id
      HAVING COUNT(*) > 2
    `);
    console.log('Customers with > 2 Orders:', frequentCustomers);

    // Query 7: Orders per month in 2020
    const [ordersPerMonth] = await connection.query(`
      SELECT
        MONTH(OrderDate) AS month,
        COUNT(*) AS number_of_orders
      FROM Orders
      WHERE YEAR(OrderDate) = 2020
      GROUP BY MONTH(OrderDate)
    `);
    console.log('Orders per Month (2020):', ordersPerMonth);

    // Query 8: Product, customer, and order date for each order
    const [orderDetails] = await connection.query(`
      SELECT
        p.product_name,
        c.customer_Name,
        o.OrderDate
      FROM Orders o
      JOIN Product p ON o.Product_id = p.Product_id
      JOIN Customer c ON o.Customer_id = c.Customer_id
    `);
    console.log('Order Details:', orderDetails);

    // Query 9: Orders made three months ago
    const [recentOrders] = await connection.query(`
      SELECT *
      FROM Orders
      WHERE OrderDate BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) AND CURRENT_DATE()
    `);
    console.log('Orders (Last 3 Months):', recentOrders);

    // Query 10: Customers who never ordered
    const [neverOrdered] = await connection.query(`
      SELECT c.Customer_id
      FROM Customer c
      LEFT JOIN Orders o ON c.Customer_id = o.Customer_id
      WHERE o.Order_id IS NULL
    `);
    console.log('Customers Who Never Ordered:', neverOrdered);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the function
setupDatabase();
