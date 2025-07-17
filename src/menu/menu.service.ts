import { Injectable } from '@nestjs/common';
import { MenuItem } from './menu.entity';

@Injectable()
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Hambúrguer Clássico',
      description:
        'Hambúrguer artesanal com queijo, alface, tomate e molho especial',
      price: 25.9,
      category: 'Hambúrgueres',
      available: true,
      image: '/images/hamburger-classic.jpg',
    },
    {
      id: 2,
      name: 'Pizza Margherita',
      description:
        'Pizza tradicional com molho de tomate, mussarela e manjericão',
      price: 32.5,
      category: 'Pizzas',
      available: true,
      image: '/images/pizza-margherita.jpg',
    },
    {
      id: 3,
      name: 'Salada Caesar',
      description: 'Alface romana, croutons, parmesão e molho caesar',
      price: 18.9,
      category: 'Saladas',
      available: true,
      image: '/images/caesar-salad.jpg',
    },
    {
      id: 4,
      name: 'Refrigerante Lata',
      description: 'Coca-Cola, Pepsi, Guaraná ou Sprite - 350ml',
      price: 5.5,
      category: 'Bebidas',
      available: true,
      image: '/images/soda-can.jpg',
    },
    {
      id: 5,
      name: 'Batata Frita',
      description: 'Porção de batata frita crocante temperada',
      price: 12.9,
      category: 'Acompanhamentos',
      available: false,
      image: '/images/french-fries.jpg',
    },
  ];

  getAllMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  getAvailableMenuItems(): MenuItem[] {
    return this.menuItems.filter((item) => item.available);
  }

  getMenuItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(
      (item) =>
        item.category.toLowerCase() === category.toLowerCase() &&
        item.available,
    );
  }

  getMenuItemById(id: number): MenuItem | undefined {
    return this.menuItems.find((item) => item.id === id);
  }
}
