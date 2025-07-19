import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu(@Query('category') category?: string): MenuItem[] {
    if (category) {
      return this.menuService.getMenuItemsByCategory(category);
    }

    return this.menuService.getAllMenuItems();
  }
}
