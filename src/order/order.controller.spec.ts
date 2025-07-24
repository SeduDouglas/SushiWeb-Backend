import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrder: Order = {
    id: 1,
    customerName: 'João da Silva',
    customerPhone: '11999999999',
    customerAddress: 'Rua A, 123',
    items: [
      {
        menuItemId: '1',
        menuItemName: 'Temaki',
        quantity: 2,
        unitPrice: 20,
        totalPrice: 40,
      },
    ],
    totalAmount: 40,
    status: 'pending',
    createdAt: new Date('2025-07-23T10:00:00Z'),
    observations: 'Sem shoyu',
  };

  const mockOrderService = {
    createOrder: jest.fn((dto: CreateOrderDto) =>
      Promise.resolve({
        ...mockOrder,
        ...dto,
      }),
    ),
    getAllOrders: jest.fn(() => [mockOrder]),
    getOrderById: jest.fn((id: number) =>
      id === mockOrder.id ? mockOrder : undefined,
    ),
    updateOrderStatus: jest.fn((id: number, status: Order['status']) => ({
      ...mockOrder,
      status,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo pedido com sucesso', async () => {
    const dto: CreateOrderDto = {
      customerName: 'João da Silva',
      customerPhone: '11999999999',
      customerAddress: 'Rua A, 123',
      items: mockOrder.items,
      observations: 'Sem shoyu',
    };

    const result = await controller.createOrder(dto);
    expect(mockOrderService.createOrder).toHaveBeenCalledWith(dto);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Pedido criado com sucesso');
    expect(result.order).toMatchObject(dto);
  });

  it('deve retornar todos os pedidos', () => {
    const result = controller.getAllOrders();
    expect(mockOrderService.getAllOrders).toHaveBeenCalled();
    expect(result).toEqual([mockOrder]);
  });

  it('deve retornar o pedido pelo ID', () => {
    const result = controller.getOrderById(1);
    expect(mockOrderService.getOrderById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockOrder);
  });

  it('deve lançar NotFoundException se pedido não for encontrado', () => {
    expect(() => controller.getOrderById(999)).toThrow(
      new NotFoundException('Pedido com ID 999 não encontrado'),
    );
    expect(mockOrderService.getOrderById).toHaveBeenCalledWith(999);
  });

  it('deve atualizar o status do pedido', () => {
    const result = controller.updateOrderStatus(1, 'preparing');
    expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith(
      1,
      'preparing',
    );
    expect(result.status).toBe('preparing');
  });
});
