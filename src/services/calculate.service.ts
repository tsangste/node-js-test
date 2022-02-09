export class CalculateService {
  // 1. Only whole packs can be sent. Packs cannot be broken open.
  // 2. Within the constraints of Rule 1 above, send out no more items than necessary to fulfil the order.
  // 3. Within the constraints of Rules 1 & 2 above, send out as few packs as possible to fulfil each order.
  //| Items Ordered |     Correct size      |  Incorrect size  |
  //| 1             | 1x250                 | 1x500            |
  //| 250           | 1x250                 | 1x500            |
  //| 251           | 1x500                 | 2x250            |
  //| 500           | 1x500, 1x250          | 1x1000 or 3x250  |
  //| 12001         | 2x5000, 1x2000, 1x250 | 3x5000           |

  async getSize(sizes: number[], size: number) {
    return [0];
  }
}
