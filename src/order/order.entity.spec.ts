import { Order, OrderItem } from './order.entity';

describe('OrderItem', () => {
  it('deve criar um OrderItem válido com todas as propriedades', () => {
    const item: OrderItem = {
      menuItemId: '1',
      menuItemName: 'Temaki Salmão',
      quantity: 2,
      unitPrice: 19.9,
      totalPrice: 39.8,
      observations: 'Sem cebola',
    };

    expect(item).toMatchObject({
      menuItemId: '1',
      menuItemName: 'Temaki Salmão',
      quantity: 2,
      unitPrice: 19.9,
      totalPrice: 39.8,
      observations: 'Sem cebola',
    });
  });

  it('deve permitir OrderItem sem observações', () => {
    const item: OrderItem = {
      menuItemId: '2',
      menuItemName: 'Missoshiro',
      quantity: 1,
      unitPrice: 7.5,
      totalPrice: 7.5,
    };

    expect(item.observations).toBeUndefined();
  });
});

describe('Order', () => {
  it('deve criar uma Order completa e válida', () => {
    const order: Order = {
      id: 123,
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
      observations: 'Entregar com urgência',
    };

    expect(order.id).toBe(123);
    expect(order.items.length).toBe(1);
    expect(order.status).toBe('pending');
    expect(order.createdAt instanceof Date).toBe(true);
    expect(order.customerName).toBe('João da Silva');
  });

  it('deve aceitar pedidos sem endereço e sem observações', () => {
    const order: Order = {
      id: 456,
      customerName: 'Maria',
      customerPhone: '11988888888',
      items: [],
      totalAmount: 0,
      status: 'cancelled',
      createdAt: new Date(),
    };

    expect(order.customerAddress).toBeUndefined();
    expect(order.observations).toBeUndefined();
    expect(order.status).toBe('cancelled');
  });
});
