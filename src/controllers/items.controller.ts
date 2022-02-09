import { NextFunction, Request, Response } from 'express';
import { CreateItemDto } from '@dtos/items.dto';
import { Item } from '@interfaces/items.interface';
import ItemService from '@services/items.service';
import { SizesDto } from '@dtos/sizes.dto';
import { CalculateDto } from '@dtos/calculate.dto';

class ItemsController {
  public itemService = new ItemService();

  public getItems = (req: Request, res: Response, next: NextFunction) => {
    try {
      // implement get all
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  public getItemsById = (req: Request, res: Response, next: NextFunction) => {
    try {
      // implement get all by id
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  public createItem = (req: Request, res: Response, next: NextFunction) => {
    try {
      // implement create
      res.status(201);
    } catch (error) {
      next(error);
    }
  };

  public updateItem = (req: Request, res: Response, next: NextFunction) => {
    try {
      // implement update
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  public deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // implement delete
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  public getSize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const calculateData: CalculateDto = req.body;
      const size: number[] = await this.itemService.getSize(calculateData);

      res.status(200).json({ data: size, message: 'get size' });
    } catch (error) {
      next(error);
    }
  };

  public addSize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemId = Number(req.params.id);
      const sizeData: SizesDto = req.body;
      const updateItemData: Item = await this.itemService.addSize(itemId, sizeData);

      res.status(200).json({ data: updateItemData, message: 'add size' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemId = Number(req.params.id);
      const sizeData: SizesDto = req.body;
      const updateItemData: Item = await this.itemService.deleteSize(itemId, sizeData);

      res.status(200).json({ data: updateItemData, message: 'delete size' });
    } catch (error) {
      next(error);
    }
  };
}

export default ItemsController;
