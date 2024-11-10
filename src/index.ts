import { v4 as uuidv4 } from "uuid";
import { Server, StableBTreeMap, ic } from "azle";
import express from "express";

class Restaurant {
  id: string;
  name: string;
  location: string;
  createdAt: number;

  constructor(name: string, location: string) {
    this.id = uuidv4();
    this.name = name;
    this.location = location;
    this.createdAt = Date.now();
  }
}

class Staff {
  id: string;
  restaurantId: string;
  name: string;
  position: string;
  schedule: string;
  createdAt: number;

  constructor(restaurantId: string, name: string, position: string, schedule: string) {
    this.id = uuidv4();
    this.restaurantId = restaurantId;
    this.name = name;
    this.position = position;
    this.schedule = schedule;
    this.createdAt = Date.now();
  }
}

class MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  createdAt: number;

  constructor(restaurantId: string, name: string, description: string, price: number) {
    this.id = uuidv4();
    this.restaurantId = restaurantId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdAt = Date.now();
  }
}

class Order {
  id: string;
  restaurantId: string;
  items: string[]; // Menu item IDs
  total: number;
  status: string; // e.g., "pending", "completed"
  createdAt: number;

  constructor(restaurantId: string, items: string[], total: number) {
    this.id = uuidv4();
    this.restaurantId = restaurantId;
    this.items = items;
    this.total = total;
    this.status = "pending";
    this.createdAt = Date.now();
  }
}

class Reservation {
  id: string;
  restaurantId: string;
  name: string;
  dateTime: number;
  createdAt: number;

  constructor(restaurantId: string, name: string, dateTime: number) {
    this.id = uuidv4();
    this.restaurantId = restaurantId;
    this.name = name;
    this.dateTime = dateTime;
    this.createdAt = Date.now();
  }
}

class InventoryItem {
  id: string;
  restaurantId: string;
  name: string;
  quantity: number;
  createdAt: number;

  constructor(restaurantId: string, name: string, quantity: number) {
    this.id = uuidv4();
    this.restaurantId = restaurantId;
    this.name = name;
    this.quantity = quantity;
    this.createdAt = Date.now();
  }
}

class Expense {
  id: string;
  restaurantId: string;
  description: string;
  amount: number;
  createdAt: number;

  constructor(restaurantId: string, description: string, amount: number) {
    this.id = uuidv4();
    this.restaurantId = restaurantId;
    this.description = description;
    this.amount = amount;
    this.createdAt = Date.now();
  }
}

// Storage
const restaurantStorage = StableBTreeMap<string, Restaurant>(0);
const staffStorage = StableBTreeMap<string, Staff>(1);
const menuStorage = StableBTreeMap<string, MenuItem>(2);
const orderStorage = StableBTreeMap<string, Order>(3);
const reservationStorage = StableBTreeMap<string, Reservation>(4);
const inventoryStorage = StableBTreeMap<string, InventoryItem>(5);
const expenseStorage = StableBTreeMap<string, Expense>(6);

export default Server(() => {
  const app = express();
  app.use(express.json());

  // Create new restaurant
  app.post("/restaurants", (req, res) => {
    if (!req.body.name || !req.body.location) {
      return res.status(400).json({
        status: 400,
        error: "Invalid payload: Ensure all required fields are provided.",
      });
    }

    const restaurant = new Restaurant(req.body.name, req.body.location);
    restaurantStorage.insert(restaurant.id, restaurant);

    res.status(201).json({
      message: "Restaurant created successfully.",
      restaurant: restaurant,
    });
  });

  // Get all restaurants
  app.get("/restaurants", (req, res) => {
    const restaurants = restaurantStorage.values();
    if (restaurants.length === 0) {
      return res.status(404).json({
        message: "No restaurants found.",
      });
    }

    res.status(200).json({
      message: "Restaurants retrieved successfully.",
      restaurants: restaurants,
    });
  });

  // Get restaurant by ID
  app.get("/restaurants/:id", (req, res) => {
    const restaurantId = req.params.id;
    const restaurantOpt = restaurantStorage.get(restaurantId);

    if ("None" in restaurantOpt) {
      return res.status(400).json({
        status: 400,
        message: `Restaurant not found with id=${restaurantId}`,
      });
    }

    res.status(200).json({
      message: "Restaurant retrieved successfully.",
      restaurant: restaurantOpt.Some,
    });
  });

  // Create new staff
  app.post("/staff", (req, res) => {
    if (!req.body.restaurantId || !req.body.name || !req.body.position || !req.body.schedule) {
      return res.status(400).json({
        status: 400,
        error: "Invalid payload: Ensure all required fields are provided.",
      });
    }

    const staff = new Staff(req.body.restaurantId, req.body.name, req.body.position, req.body.schedule);
    staffStorage.insert(staff.id, staff);

    res.status(201).json({
      message: "Staff created successfully.",
      staff: staff,
    });
  });

  // Get all staff
  app.get("/staff", (req, res) => {
    const staff = staffStorage.values();
    if (staff.length === 0) {
      return res.status(404).json({
        message: "No staff found.",
      });
    }

    res.status(200).json({
      message: "Staff retrieved successfully.",
      staff: staff,
    });
  });

  // Get staff by ID
  app.get("/staff/:id", (req, res) => {
    const staffId = req.params.id;
    const staffOpt = staffStorage.get(staffId);

    if ("None" in staffOpt) {
      return res.status(400).json({
        status: 400,
        message: `Staff not found with id=${staffId}`,
      });
    }

    res.status(200).json({
      message: "Staff retrieved successfully.",
      staff: staffOpt.Some,
    });
  });

  // Create new menu item
  app.post("/menu", (req, res) => {
    if (!req.body.restaurantId || !req.body.name || !req.body.description || !req.body.price) {
      return res.status(400).json({
        status: 400,
        error: "Invalid payload: Ensure all required fields are provided.",
      });
    }

    const menuItem = new MenuItem(req.body.restaurantId, req.body.name, req.body.description, req.body.price);
    menuStorage.insert(menuItem.id, menuItem);

    res.status(201).json({
      message: "Menu item created successfully.",
      menuItem: menuItem,
    });
  });

  // Get all menu items
  app.get("/menu", (req, res) => {
    const menuItems = menuStorage.values();
    if (menuItems.length === 0) {
      return res.status(404).json({
        message: "No menu items found.",
      });
    }

    res.status(200).json({
      message: "Menu items retrieved successfully.",
      menuItems: menuItems,
    });
  });

  // Get menu item by ID
  app.get("/menu/:id", (req, res) => {
    const menuItemId = req.params.id;
    const menuItemOpt = menuStorage.get(menuItemId);

    if ("None" in menuItemOpt) {
      return res.status(400).json({
        status: 400,
        message: `Menu item not found with id=${menuItemId}`,
      });
    }

    res.status(200).json({
      message: "Menu item retrieved successfully.",
      menuItem: menuItemOpt.Some,
    });
  });

  // Create new order
  app.post("/orders", (req, res) => {
    if (!req.body.restaurantId || !req.body.items || !req.body.total) {
      return res.status(400).json({
        status: 400,
        error: "Invalid payload: Ensure all required fields are provided.",
      });
    }

    const order = new Order(req.body.restaurantId, req.body.items, req.body.total);
    orderStorage.insert(order.id, order);

    res.status(201).json({
      message: "Order created successfully.",
      order: order,
    });
  });

  // Get all orders
  app.get("/orders", (req, res) => {
    const orders = orderStorage.values();
    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found.",
      });
    }

    res.status(200).json({
      message: "Orders retrieved successfully.",
      orders: orders,
    });
  });

  // Get order by ID
  app.get("/orders/:id", (req, res) => {
    const orderId = req.params.id;
    const orderOpt = orderStorage.get(orderId);

    if ("None" in orderOpt) {
      return res.status(400).json({
        status: 400,
        message: `Order not found with id=${orderId}`,
      });
    }

    res.status(200).json({
      message: "Order retrieved successfully.",
      order: orderOpt.Some,
    });
  });

  // Create new reservation
  app.post("/reservations", (req, res) => {
    if (!req.body.restaurantId || !req.body.name || !req.body.dateTime) {
      return res.status(400).json({
        status: 400,
        error: "Invalid payload: Ensure all required fields are provided.",
      });
    }

    const reservation = new Reservation(req.body.restaurantId, req.body.name, req.body.dateTime);
    reservationStorage.insert(reservation.id, reservation);

    res.status(201).json({
      message: "Reservation created successfully.",
      reservation: reservation,
    });
  });

  // Get all reservations
  app.get("/reservations", (req, res) => {
    const reservations = reservationStorage.values();
    if (reservations.length === 0) {
      return res.status(404).json({
        message: "No reservations found.",
      });
    }

    res.status(200).json({
      message: "Reservations retrieved successfully.",
      reservations: reservations,
    });
  });

  // Get reservation by ID
  app.get("/reservations/:id", (req, res) => {
    const reservationId = req.params.id;
    const reservationOpt = reservationStorage.get(reservationId);

    if ("None" in reservationOpt) {
      return res.status(400).json({
        status: 400,
        message: `Reservation not found with id=${reservationId}`,
      });
    }

    res.status(200).json({
      message: "Reservation retrieved successfully.",
      reservation: reservationOpt.Some,
    });
  });

  // Create new inventory item
  app.post("/inventory", (req, res) => {
    if (!req.body.restaurantId || !req.body.name || !req.body.quantity) {
      return res.status(400).json({
        status: 400,
        error: "Invalid payload: Ensure all required fields are provided.",
      });
    }

    const inventoryItem = new InventoryItem(req.body.restaurantId, req.body.name, req.body.quantity);
    inventoryStorage.insert(inventoryItem.id, inventoryItem);

    res.status(201).json({
      message: "Inventory item created successfully.",
      inventoryItem: inventoryItem,
    });
  });

  // Get all inventory items
  app.get("/inventory", (req, res) => {
    const inventoryItems = inventoryStorage.values();
    if (inventoryItems.length === 0) {
      return res.status(404).json({
        message: "No inventory items found.",
      });
    }

    res.status(200).json({
      message: "Inventory items retrieved successfully.",
      inventoryItems: inventoryItems,
    });
  });

  // Get inventory item by ID
  
  app.get("/inventory/:id", (req, res) => {
    const inventoryItemId = req.params.id;
    const inventoryItemOpt = inventoryStorage.get(inventoryItemId);

    if ("None" in inventoryItemOpt) {
      return res.status(400).json({
        status: 400,
        message: `Inventory item not found with id=${inventoryItemId}`,
      });
    }

    res.status(200).json({
      message: "Inventory item retrieved successfully.",
      inventoryItem: inventoryItemOpt.Some,
    });
  });

  // Create new expense
  app.post("/expenses", (req, res) => {
    if (!req.body.restaurantId || !req.body.description || !req.body.amount) {
      return res.status(400).json({
        status: 400,
        error: "Invalid payload: Ensure all required fields are provided.",
      });
    }

    const expense = new Expense(req.body.restaurantId, req.body.description, req.body.amount);
    expenseStorage.insert(expense.id, expense);

    res.status(201).json({
      message: "Expense created successfully.",
      expense: expense,
    });
  });

  // Get all expenses
  app.get("/expenses", (req, res) => {
    const expenses = expenseStorage.values();
    if (expenses.length === 0) {
      return res.status(404).json({
        message: "No expenses found.",
      });
    }

    res.status(200).json({
      message: "Expenses retrieved successfully.",
      expenses: expenses,
    });
  });

  // Get expense by ID
  app.get("/expenses/:id", (req, res) => {
    const expenseId = req.params.id;
    const expenseOpt = expenseStorage.get(expenseId);

    if ("None" in expenseOpt) {
      return res.status(400).json({
        status: 400,
        message: `Expense not found with id=${expenseId}`,
      });
    }

    res.status(200).json({
      message: "Expense retrieved successfully.",
      expense: expenseOpt.Some,
    });
  });

  return app.listen();
});
