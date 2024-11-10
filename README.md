
# Restaurant Management System 🍽️

A robust and secure restaurant management system built with TypeScript and Express.js, running on the Internet Computer platform. This system facilitates the management of restaurants, staff, menu items, orders, reservations, inventory, and expenses.

## Features 🌟

### Restaurant Management 🏠
- Create, update, and delete restaurant profiles
- Track details including location and creation date

### Staff Management 👥
- Add and update staff information
- Manage staff positions and schedules

### Menu Management 📜
- Create and update menu items
- Track item descriptions, prices, and availability

### Order Management 📦
- Create and track customer orders
- Manage order status (e.g., pending, completed)

### Reservation Management 📅
- Schedule reservations
- Track reservation details including date and customer name

### Inventory Management 📦
- Manage inventory items and quantities
- Track and update stock levels

### Expense Tracking 💵
- Record and categorize expenses
- Monitor financial outflows

## API Endpoints 🛣️

### Restaurant Endpoints
```
POST /restaurants - Create a new restaurant
GET /restaurants - Retrieve all restaurants
GET /restaurants/:id - Retrieve a restaurant by ID
```

### Staff Endpoints
```
POST /staff - Add new staff
GET /staff - Retrieve all staff
GET /staff/:id - Retrieve staff by ID
```

### Menu Endpoints
```
POST /menu - Add a new menu item
GET /menu - Retrieve all menu items
GET /menu/:id - Retrieve menu item by ID
```

### Order Endpoints
```
POST /orders - Place a new order
GET /orders - Retrieve all orders
GET /orders/:id - Retrieve order by ID
```

### Reservation Endpoints
```
POST /reservations - Make a new reservation
GET /reservations - Retrieve all reservations
GET /reservations/:id - Retrieve reservation by ID
```

### Inventory Endpoints
```
POST /inventory - Add inventory item
GET /inventory - Retrieve all inventory items
GET /inventory/:id - Retrieve inventory item by ID
```

### Expense Endpoints
```
POST /expenses - Log a new expense
GET /expenses - Retrieve all expenses
GET /expenses/:id - Retrieve expense by ID
```

## Data Models 📊

### Restaurant
- ID (UUID)
- Name
- Location
- CreatedAt timestamp

### Staff
- ID (UUID)
- Restaurant ID
- Name
- Position
- Schedule
- CreatedAt timestamp

### MenuItem
- ID (UUID)
- Restaurant ID
- Name
- Description
- Price
- CreatedAt timestamp

### Order
- ID (UUID)
- Restaurant ID
- Items (Menu item IDs)
- Total
- Status
- CreatedAt timestamp

### Reservation
- ID (UUID)
- Restaurant ID
- Name
- DateTime
- CreatedAt timestamp

### InventoryItem
- ID (UUID)
- Restaurant ID
- Name
- Quantity
- CreatedAt timestamp

### Expense
- ID (UUID)
- Restaurant ID
- Description
- Amount
- CreatedAt timestamp

## Installation and Setup 🚀

1. Clone the repository
    ```
    git clone https://github.com/jrmugweru/restaurant-management-system.git
    ```
2. Navigate to the project directory
    ```
    cd restaurant-management-system
    ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Local Replica
    ```
    dfx stop && dfx  start --host 127.0.0.1:8000 --clean --background
    ```
5. Deploy the project locally
    ```
    dfx deploy
    ```

## Dependencies 📦
- uuid
- express
