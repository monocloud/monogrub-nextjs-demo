import fs from 'fs';
import path from 'path';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  total: number;
  status: string;
  date: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  date: string;
}

export interface Database {
  restaurants: Restaurant[];
  orders: Order[];
  invoices: Invoice[];
}

const dataFile = path.join(process.cwd(), 'data.json');

export function getDb(): Database {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ restaurants: [], orders: [], invoices: [] }));
  }
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

export function saveDb(data: Database) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}
