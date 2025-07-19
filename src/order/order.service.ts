import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderItem } from './order.entity';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private orderIdCounter = 1;

  constructor(private readonly menuService: MenuService) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const {
      customerName,
      customerPhone,
      customerAddress,
      items,
      observations,
    } = createOrderDto;

    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of items) {
      const menuItem = this.menuService.getMenuItemById(item.menuItemId);

      if (!menuItem) {
        throw new NotFoundException(
          `Item com ID ${item.menuItemId} não encontrado no menu`,
        );
      }

      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        menuItemId: item.menuItemId,
        menuItemName: menuItem.name,
        quantity: item.quantity,
        unitPrice: menuItem.price,
        totalPrice: itemTotal,
        observations: item.observations,
      });
    }

    const order: Order = {
      id: this.orderIdCounter++,
      customerName,
      customerPhone,
      customerAddress,
      items: orderItems,
      totalAmount,
      status: 'pending',
      createdAt: new Date(),
      observations,
    };

    this.orders.push(order);
    return order;
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  updateOrderStatus(id: number, status: Order['status']): Order {
    const order = this.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    order.status = status;
    return order;
  }
}
