export class OrderItem {
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  observations?: string;
}

export class Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: OrderItem[];
  totalAmount: number;
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'delivered'
    | 'cancelled';
  createdAt: Date;
  observations?: string;
}
