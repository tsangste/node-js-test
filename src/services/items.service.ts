import { CreateItemDto } from '@dtos/items.dto';
import { HttpException } from '@exceptions/HttpException';
import { Item } from '@interfaces/items.interface';
import itemModel from '@models/items.model';
import { SizesDto } from '@dtos/sizes.dto';
import { CalculateDto } from '@dtos/calculate.dto';
import { CalculateService } from './calculate.service';

class ItemService {
  public items = itemModel;

  private calculateService: CalculateService;

  constructor() {
    this.calculateService = new CalculateService();
  }

  public async findAllItems(): Promise<Item[]> {
    const items: Item[] = this.items;
    return items;
  }

  public async findItemById(itemId: number): Promise<Item> {
    const findItem: Item = this.items.find(item => item.id === itemId);
    if (!findItem) throw new HttpException(404, 'Item not found');

    return findItem;
  }

  public async createItem(itemData: CreateItemDto): Promise<Item> {
    const findItem: Item = this.items.find(item => item.name === itemData.name);
    if (findItem) throw new HttpException(400, `Your item ${itemData.name} already exists`);

    const createItemData: Item = { id: this.items.length + 1, ...itemData };
    this.items = [...this.items, createItemData];

    return createItemData;
  }

  public async updateItem(itemId: number, itemData: CreateItemDto): Promise<Item[]> {
    const findItem: Item = this.items.find(item => item.id === itemId);
    if (!findItem) throw new HttpException(404, 'Item not found');

    const updateItemData: Item[] = this.items.map((item: Item) => {
      if (item.id === findItem.id) item = { id: itemId, ...itemData };
      return item;
    });

    return updateItemData;
  }

  public async deleteItem(itemId: number): Promise<Item[]> {
    const findItem: Item = this.items.find(item => item.id === itemId);
    if (!findItem) throw new HttpException(404, 'Item not found');

    const deleteItemData: Item[] = this.items.filter(item => item.id !== findItem.id);
    return deleteItemData;
  }

  public async addSize(itemId: number, sizeData: SizesDto) {
    const findItem: Item = this.items.find(item => item.id === itemId);
    if (!findItem) throw new HttpException(404, 'Item not found');

    findItem.sizes = [...findItem.sizes, ...sizeData.sizes].sort((a, b) => a - b);

    return findItem;
  }

  public async deleteSize(itemId: number, sizeData: SizesDto) {
    const findItem: Item = this.items.find(item => item.id === itemId);
    if (!findItem) throw new HttpException(404, 'Item not found');

    for (const size of sizeData.sizes) {
      const index = findItem.sizes.indexOf(size);
      if (index > -1) {
        findItem.sizes.splice(index, 1);
      }
    }

    return findItem;
  }

  async getSize(calculateData: CalculateDto) {
    const findItem: Item = this.items.find(item => item.id === calculateData.itemId);
    if (!findItem) throw new HttpException(404, 'Item not found');

    return this.calculateService.getSize(findItem.sizes, calculateData.size);
  }
}

export default ItemService;
