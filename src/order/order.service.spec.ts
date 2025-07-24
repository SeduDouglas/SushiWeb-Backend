import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { MenuService } from '../menu/menu.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotFoundException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;

  const mockMenuItem = {
    id: '1',
    name: 'Temaki Salmão',
    price: 20,
    category: 'Sushi',
    image: '/temaki.jpg',
  };

  const mockMenuService = {
    getMenuItemById: jest.fn((id: string) =>
      id === '1' ? mockMenuItem : undefined,
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: MenuService,
          useValue: mockMenuService,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um pedido válido com itens existentes', async () => {
    const dto: CreateOrderDto = {
      customerName: 'Maria',
      customerPhone: '11999999999',
      customerAddress: 'Rua B, 456',
      items: [
        {
          menuItemId: '1',
          quantity: 2,
        },
      ],
    };

    const order = await service.createOrder(dto);

    expect(order.id).toBeDefined();
    expect(order.items.length).toBe(1);
    expect(order.totalAmount).toBe(40);
    expect(order.status).toBe('pending');
    expect(order.customerName).toBe('Maria');
    expect(mockMenuService.getMenuItemById).toHaveBeenCalledWith('1');
  });

  it('deve lançar NotFoundException se item do menu não for encontrado', async () => {
    const dto: CreateOrderDto = {
      customerName: 'Carlos',
      customerPhone: '11988888888',
      items: [
        {
          menuItemId: '999',
          quantity: 1,
        },
      ],
    };

    await expect(service.createOrder(dto)).rejects.toThrow(
      new NotFoundException('Item com ID 999 não encontrado no menu'),
    );

    expect(mockMenuService.getMenuItemById).toHaveBeenCalledWith('999');
  });

  it('deve retornar todos os pedidos', async () => {
    const dto: CreateOrderDto = {
      customerName: 'João',
      customerPhone: '11911111111',
      items: [{ menuItemId: '1', quantity: 1 }],
    };

    await service.createOrder(dto);
    const orders = service.getAllOrders();
    expect(orders.length).toBe(1);
    expect(orders[0].customerName).toBe('João');
  });

  it('deve retornar pedido por ID', async () => {
    const dto: CreateOrderDto = {
      customerName: 'Ana',
      customerPhone: '11922222222',
      items: [{ menuItemId: '1', quantity: 1 }],
    };

    const created = await service.createOrder(dto);
    const found = service.getOrderById(created.id);

    expect(found).toEqual(created);
  });

  it('deve retornar undefined para pedido inexistente por ID', () => {
    const found = service.getOrderById(999);
    expect(found).toBeUndefined();
  });

  it('deve atualizar o status de um pedido existente', async () => {
    const dto: CreateOrderDto = {
      customerName: 'Lucas',
      customerPhone: '11933333333',
      items: [{ menuItemId: '1', quantity: 1 }],
    };

    const created = await service.createOrder(dto);
    const updated = service.updateOrderStatus(created.id, 'ready');

    expect(updated.status).toBe('ready');
  });

  it('deve lançar NotFoundException ao tentar atualizar status de pedido inexistente', () => {
    expect(() => service.updateOrderStatus(999, 'cancelled')).toThrow(
      new NotFoundException('Pedido com ID 999 não encontrado'),
    );
  });
});
