import { Router } from 'express';
import ItemsController from '@controllers/items.controller';
import { Routes } from '@interfaces/routes.interface';

class ItemsRoute implements Routes {
  public path = '/items';
  public router = Router();
  public itemsController = new ItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.itemsController.getItems);
    this.router.get(`${this.path}/:id(\\d+)`, this.itemsController.getItemsById);
    this.router.post(`${this.path}`, this.itemsController.createItem);
    this.router.put(`${this.path}/:id(\\d+)`, this.itemsController.updateItem);
    this.router.delete(`${this.path}/:id(\\d+)`, this.itemsController.deleteItem);

    this.router.post(`${this.path}/sizes`, this.itemsController.getSize);
    this.router.post(`${this.path}/:id(\\d+)/sizes`, this.itemsController.addSize);
    this.router.delete(`${this.path}/:id(\\d+)/sizes`, this.itemsController.deleteSize);
  }
}

export default ItemsRoute;
