import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    service = new MenuService();
  });

  describe('getAllMenuItems', () => {
    it('deve retornar todos os itens do menu', () => {
      const items = service.getAllMenuItems();
      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBe(12);
    });
  });

  describe('getMenuItemsByCategory', () => {
    it('deve retornar itens da categoria "Sushi"', () => {
      const items = service.getMenuItemsByCategory('Sushi');
      expect(items.every((item) => item.category === 'Sushi')).toBe(true);
      expect(items.length).toBe(3);
    });

    it('deve retornar itens da categoria "Entrada" (case-insensitive)', () => {
      const items = service.getMenuItemsByCategory('entrada');
      expect(items.every((item) => item.category === 'Entrada')).toBe(true);
      expect(items.length).toBe(4);
    });

    it('deve retornar um array vazio para categoria inexistente', () => {
      const items = service.getMenuItemsByCategory('Pizzas');
      expect(items).toEqual([]);
    });
  });

  describe('getMenuItemById', () => {
    it('deve retornar o item com o ID especificado', () => {
      const item = service.getMenuItemById('5');
      expect(item).toBeDefined();
      expect(item?.name).toBe('Temaki Camarão');
    });

    it('deve retornar undefined para ID inexistente', () => {
      const item = service.getMenuItemById('999');
      expect(item).toBeUndefined();
    });
  });
});
