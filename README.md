# 📊 Data Query Language (DQL) Checkpoint

> A complete SQL Data Query Language (DQL) checkpoint demonstrating database creation, data population, and advanced querying using **MySQL** and **Node.js**.

---

## 📖 Overview

This project showcases the practical implementation of **Data Query Language (DQL)** concepts by creating a relational database, inserting sample records, and executing a collection of SQL queries to retrieve, analyze, and summarize data.

The project combines:

- **MySQL** for database management
- **Node.js** with the **mysql2** package for database connectivity
- SQL scripts demonstrating common DQL operations

The implementation covers filtering, sorting, aggregation, grouping, joins, date functions, and subqueries commonly used in relational database systems.

---

# 📂 Project Structure

```text
DQL-Checkpoint-main/
│
├── DQL.js                           # Node.js application
├── DQL.sql                          # SQL queries
├── DQL conception.png               # Database schema
├── Execution the js file (1).png    # Program execution screenshot
└── README.md
```

---

# 🚀 Features

## Database Initialization

The Node.js application automatically:

- Creates the database
- Selects the database
- Creates relational tables
- Inserts sample data
- Executes all required SQL queries
- Displays results in the terminal

---

## Database Tables

### Customer

| Column | Type |
|---------|------|
| Customer_id | INT (PK) |
| customer_Name | VARCHAR |
| customer_Tel | VARCHAR |

---

### Product

| Column | Type |
|---------|------|
| Product_id | INT (PK) |
| product_name | VARCHAR |
| category | VARCHAR |
| Price | DECIMAL |

---

### Orders

| Column | Type |
|---------|------|
| Order_id | INT (PK) |
| Customer_id | INT (FK) |
| Product_id | INT (FK) |
| OrderDate | DATE |
| quantity | INT |
| total_amount | DECIMAL |

---

# 🛠 Technologies Used

- Node.js
- MySQL
- mysql2
- SQL (DQL)
- JavaScript (ES6)

---

# 📦 Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/DQL-Checkpoint.git
```

```bash
cd DQL-Checkpoint-main
```

---

## Install dependencies

```bash
npm install mysql2
```

---

## Configure MySQL

Update the database credentials inside:

```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true
};
```

Modify them according to your local MySQL installation.

---

# ▶️ Running the Project

Execute:

```bash
node DQL.js
```

The application will automatically:

- Create the database (`yassineDQL`)
- Create all tables
- Insert sample data
- Execute every SQL query
- Print the results to the console

---

# 📝 SQL Queries Implemented

The project demonstrates the following DQL operations:

## 1. Retrieve all customers

```sql
SELECT * FROM Customer;
```

---

## 2. Filter products by price range

```sql
SELECT product_name, category
FROM Product
WHERE Price BETWEEN 5000 AND 10000;
```

---

## 3. Sort products by price (Descending)

```sql
SELECT *
FROM Product
ORDER BY Price DESC;
```

---

## 4. Aggregate order statistics

- Total orders
- Average amount
- Maximum amount
- Minimum amount

Uses:

- COUNT()
- AVG()
- MAX()
- MIN()

---

## 5. Count orders per product

Uses:

```sql
GROUP BY
COUNT()
```

---

## 6. Customers with more than two orders

Uses:

```sql
HAVING
GROUP BY
```

---

## 7. Monthly order statistics

Uses:

```sql
YEAR()
MONTH()
GROUP BY
```

---

## 8. Retrieve order details

Uses relational joins:

- Customer
- Product
- Orders

Returning:

- Product name
- Customer name
- Order date

---

## 9. Orders from the last three months

Uses:

```sql
DATE_SUB()
CURRENT_DATE()
```

---

## 10. Customers who never placed an order

Uses:

- LEFT JOIN
- NULL filtering

---

# 🗄 Database Workflow

```
Database Creation
        │
        ▼
Table Creation
        │
        ▼
Insert Sample Data
        │
        ▼
Execute SQL Queries
        │
        ▼
Display Results
```

---

# 📸 Project Screenshots

The repository includes:

- **Database conception diagram**
- **Execution output of the Node.js application**

These provide a visual overview of the database structure and query execution.

---

# 💡 Learning Outcomes

Through this checkpoint, the following database concepts are practiced:

- Database creation
- Table relationships
- Primary Keys
- Foreign Keys
- Data insertion
- Data retrieval
- Filtering records
- Sorting
- Aggregate functions
- GROUP BY
- HAVING
- INNER JOIN
- LEFT JOIN
- Date manipulation
- SQL query optimization fundamentals
- Connecting Node.js with MySQL

---

# 📚 Concepts Covered

- SQL Data Query Language (DQL)
- Relational Databases
- CRUD (Read operations)
- Aggregate Functions
- SQL Joins
- Grouping Records
- Date Functions
- Database Connectivity using Node.js

---

# 🔮 Possible Improvements

Future enhancements could include:

- Parameterized SQL queries
- Prepared statements for security
- Input validation
- Error logging
- Transaction management
- Connection pooling
- REST API integration with Express.js
- Pagination for large datasets
- Unit testing
- Docker support

---

# 👨‍💻 Author

**Yassine Kalthoum**

Data Query Language (DQL) Checkpoint

---

# 📄 License

This project is intended for educational purposes as part of a Database Systems learning checkpoint.

Feel free to fork, study, and extend it for learning and practice.
