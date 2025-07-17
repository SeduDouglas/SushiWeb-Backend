import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu(
    @Query('category') category?: string,
    @Query('available') available?: string,
  ): MenuItem[] {
    if (category) {
      return this.menuService.getMenuItemsByCategory(category);
    }

    if (available === 'true') {
      return this.menuService.getAvailableMenuItems();
    }

    return this.menuService.getAllMenuItems();
  }
}
