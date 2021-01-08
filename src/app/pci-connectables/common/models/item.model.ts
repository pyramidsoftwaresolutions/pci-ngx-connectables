/**to be used both externally and internall to pass input data to the framework */
export class ConnectableItemModel {
  data: any;
  displayText?: string;
  displayDataField?: string;
  __isSelected?: boolean;
  __isMapped?: boolean;
  color?: string;
}

/**to be used internally */
export class PairItemModel {
  item: ConnectableItemModel;
  element: HTMLElement;

  constructor(item: ConnectableItemModel, element: HTMLElement) {
    this.item = item;
    this.element = element;
  }
}

/**can be used externally to get or set mapped data items */
export class MappedSourceTargetItem {
  source: ConnectableItemModel;
  target: ConnectableItemModel;
  constructor(source: ConnectableItemModel, target: ConnectableItemModel) {
    this.source = source;
    this.target = target;
  }
}

/**internally used for mapping with line connector along with source and target */
export class MappedLineAndPairItem {
  line: any;
  source: PairItemModel;
  target: PairItemModel;
  lineId: string;

  constructor(
    line: any,
    source: PairItemModel,
    target: PairItemModel,
    lineId: string
  ) {
    this.line = line;
    this.source = source;
    this.target = target;
    this.lineId = lineId;
  }
}
