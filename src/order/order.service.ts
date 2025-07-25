import { 
  Injectable, 
  BadRequestException, 
  NotFoundException,
  InternalServerErrorException 
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
    try {
      const {
        customerName,
        customerPhone,
        customerAddress,
        items,
        observations,
      } = createOrderDto;

      if (items.length === 0) {
        throw new BadRequestException('O pedido deve conter pelo menos um item', 'EMPTY_ORDER');
      }

      let totalAmount = 0;
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        const menuItem = this.menuService.getMenuItemById(item.menuItemId);

        if (!menuItem) {
          throw new NotFoundException(
            `Item com ID ${item.menuItemId} não encontrado no menu`,
            'MENU_ITEM_NOT_FOUND'
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
        updatedAt: new Date(),
        observations,
      };

      this.orders.push(order);
      return order;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao processar o pedido', 'ORDER_PROCESSING_ERROR');
    }
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  updateOrderStatus(
    id: number, 
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  ): Order {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`, 'ORDER_NOT_FOUND');
    }

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      status,
      updatedAt: new Date(),
    };

    return this.orders[orderIndex];
  }
}
