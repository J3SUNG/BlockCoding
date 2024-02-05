import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { UpdateWorkspaceDataValue } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

export class BlockCommon implements BlockObject {
  name = ''; // 기본값 제공
  type = ''; // 기본값 제공
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }
  paint(
    id: string,
    x: number,
    y: number,
    value?: BlockObjectValue | undefined,
    onValueChange?: UpdateWorkspaceDataValue | undefined,
  ): HTMLElement {
    throw new Error('Method not implemented.');
  }

  // TODO : 추후 구현 예정
  setChildPosition(x: number, y: number, index?: number) {
    return { childX: x, childY: y };
  }

  insert(obj: BlockObject) {
    return;
  }

  getInnerBlock(): BlockObjectValue[] {
    return [this.data.value];
  }

  runLogic(operand1?: string, operand2?: string): string | boolean | Promise<void> {
    return '';
  }
}
