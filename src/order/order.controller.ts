import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<{
    success: boolean;
    message: string;
    order: Order;
  }> {
    const order = await this.orderService.createOrder(createOrderDto);

    return {
      success: true,
      message: 'Pedido criado com sucesso',
      order,
    };
  }

  @Get()
  getAllOrders(): Order[] {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id', ParseIntPipe) id: number): Order {
    const order = this.orderService.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return order;
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: Order['status'],
  ): Order {
    return this.orderService.updateOrderStatus(id, status);
  }
}
