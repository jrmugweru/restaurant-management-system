import { v4 as uuidv4 } from "uuid";
import { Server, StableBTreeMap, ic } from "azle";
import express from "express";

// Models
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

// Similar classes for Staff, MenuItem, Order, Reservation, InventoryItem, Expense ...

// Storage
const restaurantStorage = StableBTreeMap<string, Restaurant>(0);
const staffStorage = StableBTreeMap<string, Staff>(1);
const menuStorage = StableBTreeMap<string, MenuItem>(2);
const orderStorage = StableBTreeMap<string, Order>(3);
const reservationStorage = StableBTreeMap<string, Reservation>(4);
const inventoryStorage = StableBTreeMap<string, InventoryItem>(5);
const expenseStorage = StableBTreeMap<string, Expense>(6);

// Helper functions
function jsonResponse(status: number, message: string, data: any = null) {
  return { status, message, data };
}

function validatePayload(requiredFields: string[], payload: any) {
  for (const field of requiredFields) {
    if (!(field in payload)) {
      return `Invalid payload: missing ${field}`;
    }
  }
  return null;
}

// Express Application
export default Server(() => {
  const app = express();
  app.use(express.json());

  // Middleware for Token-based Authentication
  app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token || token !== "secureToken") {
      return res.status(403).json(jsonResponse(403, "Forbidden: Invalid token"));
    }
    next();
  });

  // Create new restaurant
  app.post("/restaurants", (req, res) => {
    const validationError = validatePayload(["name", "location"], req.body);
    if (validationError) {
      return res.status(400).json(jsonResponse(400, validationError));
    }

    const restaurant = new Restaurant(req.body.name, req.body.location);
    restaurantStorage.insert(restaurant.id, restaurant);

    res.status(201).json(jsonResponse(201, "Restaurant created successfully.", restaurant));
  });

  // Get all restaurants (with pagination)
  app.get("/restaurants", (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const restaurants = restaurantStorage.values().slice((page - 1) * limit, page * limit);

    if (restaurants.length === 0) {
      return res.status(404).json(jsonResponse(404, "No restaurants found."));
    }

    res.status(200).json(jsonResponse(200, "Restaurants retrieved successfully.", restaurants));
  });

  // Get restaurant by ID
  app.get("/restaurants/:id", (req, res) => {
    const restaurantId = req.params.id;
    const restaurantOpt = restaurantStorage.get(restaurantId);

    if ("None" in restaurantOpt) {
      return res.status(404).json(jsonResponse(404, `Restaurant not found with id=${restaurantId}`));
    }

    res.status(200).json(jsonResponse(200, "Restaurant retrieved successfully.", restaurantOpt.Some));
  });

  // Additional endpoints for Staff, Menu, Order, Reservation, InventoryItem, and Expense...
  // Similar improvements can be applied to each endpoint (payload validation, pagination, standardized responses)

  return app.listen();
});
