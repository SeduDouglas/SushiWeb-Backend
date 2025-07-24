import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuItem } from './menu.entity';

describe('MenuController', () => {
  let controller: MenuController;

  const mockMenuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Sushi Salmão',
      image: '/public/img1.jpg',
      price: 25.9,
      category: 'Sushi',
    },
    {
      id: '2',
      name: 'Temaki Atum',
      image: '/public/img2.jpg',
      price: 19.9,
      category: 'Temaki',
    },
  ];

  const mockMenuService = {
    getAllMenuItems: jest.fn(() => mockMenuItems),
    getMenuItemsByCategory: jest.fn((category: string) =>
      mockMenuItems.filter((item) => item.category === category),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [
        {
          provide: MenuService,
          useValue: mockMenuService,
        },
      ],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar todos os itens do menu quando nenhuma categoria for passada', () => {
    const result = controller.getMenu();
    expect(mockMenuService.getAllMenuItems).toHaveBeenCalled();
    expect(result).toEqual(mockMenuItems);
  });

  it('deve retornar apenas itens da categoria especificada', () => {
    const result = controller.getMenu('Sushi');
    expect(mockMenuService.getMenuItemsByCategory).toHaveBeenCalledWith(
      'Sushi',
    );
    expect(result).toEqual([
      {
        id: '1',
        name: 'Sushi Salmão',
        image: '/public/img1.jpg',
        price: 25.9,
        category: 'Sushi',
      },
    ]);
  });
});
