import { Injectable } from '@nestjs/common';
import { MenuItem } from './menu.entity';

@Injectable()
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Sushi Salmão',
      image: '/public/img1.jpg',
      price: 25.9,
      category: 'Sushi',
    },
    {
      id: 2,
      name: 'Temaki Atum',
      image: '/public/img2.jpg',
      price: 19.9,
      category: 'Temaki',
    },
    {
      id: 3,
      name: 'Guioza Vegetariano',
      image: '/public/img9.jpg',
      price: 14.9,
      category: 'Entrada',
    },
    {
      id: 4,
      name: 'Sashimi Salmão',
      image: '/public/img4.jpg',
      price: 29.9,
      category: 'Sushi',
    },
    {
      id: 5,
      name: 'Temaki Camarão',
      image: '/public/img5.jpg',
      price: 22.5,
      category: 'Temaki',
    },
    {
      id: 6,
      name: 'Hot Roll',
      image: '/public/img6.jpg',
      price: 18.0,
      category: 'Sushi',
    },
    {
      id: 7,
      name: 'Sunomono',
      image: '/public/img7.jpg',
      price: 9.9,
      category: 'Entrada',
    },
    {
      id: 8,
      name: 'Missoshiro',
      image: '/public/img8.jpg',
      price: 7.5,
      category: 'Entrada',
    },
    {
      id: 9,
      name: 'Tempurá de Legumes',
      image: '/public/img3.jpg',
      price: 12.0,
      category: 'Entrada',
    },
    {
      id: 10,
      name: 'Mochi (Doce de Arroz)',
      image: '/public/img10.jpg',
      price: 11.9,
      category: 'Sobremesa',
    },
    {
      id: 11,
      name: 'Refrigerante Lata',
      image: '/public/img_soda.jpg',
      price: 6.0,
      category: 'Bebida',
    },
    {
      id: 12,
      name: 'Chá Verde Gelado',
      image: '/public/chá_gelado.jpg',
      price: 5.5,
      category: 'Bebida',
    },
  ];

  getAllMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  getMenuItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase(),
    );
  }

  getMenuItemById(id: number): MenuItem | undefined {
    return this.menuItems.find((item) => item.id === id);
  }
}
