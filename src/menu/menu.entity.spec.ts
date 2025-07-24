import { MenuItem } from './menu.entity';

describe('MenuItem', () => {
  it('deve criar um objeto MenuItem com as propriedades corretas', () => {
    const item = new MenuItem();
    item.id = '1';
    item.name = 'Temaki';
    item.price = 19.9;
    item.category = 'Sushi';
    item.image = '/temaki.jpg';

    expect(item).toEqual({
      id: '1',
      name: 'Temaki',
      price: 19.9,
      category: 'Sushi',
      image: '/temaki.jpg',
    });
  });

  it('deve permitir um item sem imagem', () => {
    const item = new MenuItem();
    item.id = '2';
    item.name = 'Missoshiro';
    item.price = 7.5;
    item.category = 'Entrada';

    expect(item.image).toBeUndefined();
    expect(item.name).toBe('Missoshiro');
  });
});
