import { Injectable } from '@nestjs/common';
import { MenuItem } from './menu.entity';

@Injectable()
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Sushi Salmão',
      description: 'Fatias frescas de salmão sobre arroz temperado, servidas com um toque de wasabi e molho shoyu. Uma explosão de sabor tradicional japonês.',
      image: '/public/img1.jpg',
      price: 25.9,
      category: 'Sushi',
    },
    {
      id: '2',
      name: 'Temaki Atum',
      description: 'Cone crocante de alga recheado com arroz, atum fresco e cebolinha, finalizado com gergelim. Uma experiência única em cada mordida.',
      image: '/public/img2.jpg',
      price: 19.9,
      category: 'Temaki',
    },
    {
      id: '3',
      name: 'Guioza Vegetariano',
      description: 'Delicados pasteis japoneses recheados com legumes selecionados, levemente grelhados e servidos com molho especial.',
      image: '/public/img9.jpg',
      price: 14.9,
      category: 'Entrada',
    },
    {
      id: '4',
      name: 'Sashimi Salmão',
      description: 'Lâminas de salmão fresco cortadas na perfeição, servidas puras para realçar o sabor e a textura do peixe.',
      image: '/public/img4.jpg',
      price: 29.9,
      category: 'Sushi',
    },
    {
      id: '5',
      name: 'Temaki Camarão',
      description: 'Cone de alga recheado com arroz, camarões suculentos e molho especial, proporcionando uma combinação irresistível.',
      image: '/public/img5.jpg',
      price: 22.5,
      category: 'Temaki',
    },
    {
      id: '6',
      name: 'Hot Roll',
      description: 'Rolinho empanado e frito, recheado com salmão, cream cheese e cebolinha, servido com molho tarê. Crocante por fora e cremoso por dentro.',
      image: '/public/img6.jpg',
      price: 18.0,
      category: 'Sushi',
    },
    {
      id: '7',
      name: 'Sunomono',
      description: 'Refrescante salada de pepino japonês fatiado, temperada com molho agridoce e gergelim. Leve e saborosa.',
      image: '/public/img7.jpg',
      price: 9.9,
      category: 'Entrada',
    },
    {
      id: '8',
      name: 'Missoshiro',
      description: 'Tradicional sopa japonesa à base de missô, com tofu, cebolinha e algas. Reconfortante e nutritiva.',
      image: '/public/img8.jpg',
      price: 7.5,
      category: 'Entrada',
    },
    {
      id: '9',
      name: 'Tempurá de Legumes',
      description: 'Legumes frescos empanados e fritos até ficarem dourados e crocantes. Uma entrada leve e deliciosa.',
      image: '/public/img3.jpg',
      price: 12.0,
      category: 'Entrada',
    },
    {
      id: '10',
      name: 'Mochi (Doce de Arroz)',
      description: 'Tradicional doce japonês feito de arroz glutinoso, com recheio suave e textura macia. Uma sobremesa delicada e saborosa.',
      image: '/public/img10.jpg',
      price: 11.9,
      category: 'Sobremesa',
    },
    {
      id: '11',
      name: 'Refrigerante Lata',
      description: 'Sua bebida favorita em lata, perfeita para acompanhar qualquer prato do nosso cardápio.',
      image: '/public/img_soda.jpg',
      price: 6.0,
      category: 'Bebida',
    },
    {
      id: '12',
      name: 'Chá Verde Gelado',
      description: 'Chá verde refrescante servido gelado, ideal para equilibrar os sabores da culinária japonesa.',
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

  getMenuItemById(id: string): MenuItem | undefined {
    return this.menuItems.find((item) => item.id === id);
  }
}
