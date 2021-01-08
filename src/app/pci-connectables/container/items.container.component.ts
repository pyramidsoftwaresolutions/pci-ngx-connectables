import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ConnectableItemModel,
  PairItemModel,
  MappedLineAndPairItem,
  MappedSourceTargetItem,
} from '../common/models/item.model';
declare var LeaderLine: any;
declare var AnimEvent: any;

@Component({
  selector: 'pci-connectables-container',
  templateUrl: './items.container.component.html',
  styleUrls: ['items.container.component.scss'],
})
export class ItemsContainerComponent {
  @Input() id: string = 'id_to_be_passed';
  @Input() sourceItems: ConnectableItemModel[] = [];
  @Input() targetItems: ConnectableItemModel[] = [];
  @Input() mappedItems: MappedSourceTargetItem[] = [];
  @Input() sourceSelectionMode: string = 'Single'; //or Multiple
  @Input() targetSelectionMode: string = 'Single';
  @Input() pageXOffset: number = 0;
  @Input() pageYOffset: number = 0;

  @Output() Mapped: EventEmitter<any> = new EventEmitter<any>();

  scrollOffset: { x: number; y: number } = { x: 0, y: 0 };
  //================================
  @ViewChild('scrollableBox') scrollableBox: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  leftContainers: PairItemModel[] = [];
  rightContainers: PairItemModel[] = [];

  selectedSource: { element: HTMLElement; item: ConnectableItemModel }[] = [];
  mappedLines: MappedLineAndPairItem[] = [];

  /**call to get mapped source and target items */
  public getMappedItems(): MappedSourceTargetItem[] {
    let output: MappedSourceTargetItem[] = [];
    this.mappedLines.forEach((ml) => {
      output.push({ source: ml.source.item, target: ml.target.item });
    });
    return output;
  }

  leftItemRendered(arg: PairItemModel) {
    this.leftContainers.push(arg);
  }
  rightItemRendered(arg: PairItemModel) {
    this.rightContainers.push(arg);
  }

  onRemove() {
    let mappedLine = this.mappedLines.pop();
    if (mappedLine) {
      this.removeLast(mappedLine);
    }
  }

  private drawConnectors(source: PairItemModel, target: PairItemModel): any {
    let newLineId = this.id + (this.mappedLines.length + 1).toString();

    const line = new LeaderLine(source.element, target.element, {
      startPlug: 'square',
      endPlug: 'arrow',
      size: 2,
      color: source.item.color ? source.item.color : undefined,
      zindex: 9999,
      containerID: this.id,
      uniqueLineID: newLineId,
    });
    this.mappedLines.push(
      new MappedLineAndPairItem(line, source, target, newLineId)
    );
    return line;
  }

  private changeContainerOfLineSvg(isNew?: boolean) {
    let lines = document.getElementsByClassName('leader-line ' + this.id);
    const elmWrapper = this.wrapper.nativeElement;
    const rectWrapper = elmWrapper.getBoundingClientRect();
    // Move to the origin of coordinates as the document
    elmWrapper.style.transform =
      'translate(-' +
      (rectWrapper.left + this.pageXOffset) +
      'px, -' +
      (rectWrapper.top + this.pageYOffset) +
      'px)';

    for (var x = 0; x < lines.length; x++) {
      let lineSvg: any = lines[x];
      if (lineSvg.parentNode != elmWrapper) {
        lineSvg.parentNode.removeChild(lineSvg);
        elmWrapper.appendChild(lineSvg);
        if (isNew) {
          let originalTop = parseInt(lineSvg.style.top);
          lineSvg.style.top = this.scrollOffset.y + originalTop + 'px';
        }
      }
    }
  }

  private removeLast(line: MappedLineAndPairItem) {
    let lines: HTMLCollectionOf<Element> = document.getElementsByClassName(
      line.lineId
    );
    const elmWrapper = this.wrapper.nativeElement;
    if (!lines || lines.length === 0) {
      return;
    }
    let l = lines[lines.length - 1];
    l.remove();
    line.target.item.__isMapped = false;
    line.source.item.__isMapped = false;
  }

  private removeAll() {
    let lines: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'leader-line ' + this.id
    );
    const elmWrapper = this.wrapper.nativeElement;
    if (!lines) {
      return;
    }
    for (var x = 0; x < lines.length; x++) {
      let l = lines[x];
      l.parentNode.removeChild(l);
      l.remove();
    }
  }

  /**call this function from consumer to render mapped lines */
  public init() {
    var ____this = this;
    this.scrollableBox.nativeElement.addEventListener(
      'scroll',
      AnimEvent.add(function (event) {
        ____this.scrollOffset.x = event.target.scrollLeft;
        ____this.scrollOffset.y = event.target.scrollTop;
      }),
      false
    );
    //assuming that all the items HTML cards must have already rendered
    this.initializeMappedLinks();
  }

  /**call this function from consumer on destroy or on close */
  public removeLines(): void {
    this.mappedLines = [];
    this.removeAll();
  }

  public redraw(): void {
    this.mappedLines.forEach((l) => {
      l.line.position();
    });
  }

  private initializeMappedLinks() {
    this.mappedItems.forEach((mi) => {
      let srcItem: PairItemModel = this.leftContainers.find(
        (lc) => lc.item == mi.source
      );
      let trgItem: PairItemModel = this.rightContainers.find(
        (rc) => rc.item == mi.target
      );
      if (srcItem && trgItem) {
        this.drawConnectors(srcItem, trgItem);
        trgItem.item.__isMapped = true; //indicator
        srcItem.item.__isMapped = true; //indicator
      }
    });
    this.changeContainerOfLineSvg();
    this.redraw();
  }

  onSourceSelected(arg: { item: ConnectableItemModel; element: HTMLElement }) {
    if (this.sourceSelectionMode.toLowerCase() == 'single') {
      this.sourceItems.forEach((x) => (x.__isSelected = false));
      this.selectedSource = [arg];
    } else if (this.sourceSelectionMode.toLowerCase() == 'Multiple') {
      if (this.selectedSource.findIndex((x) => x.element == arg.element) < 0) {
        this.selectedSource.push(arg);
      }
    }
    arg.item.__isSelected = true;
  }

  onTargetSelected(arg: PairItemModel) {
    if (this.targetSelectionMode.toLowerCase() == 'single') {
      this.targetItems.forEach((x) => (x.__isSelected = false));
    }
    if (this.selectedSource && this.selectedSource.length && arg.element) {
      this.selectedSource.forEach((src) => {
        this.drawConnectors(src, arg);
      });
      this.changeContainerOfLineSvg(true);
      arg.item.__isSelected = false;
      arg.item.__isMapped = true; //indicator
      this.deselectAll();
      this.Mapped.emit(arg.item);
    }
  }

  private deselectAll() {
    if ((this.selectedSource || []).length > 0) {
      this.selectedSource.forEach(
        (argSrc) => (argSrc.item.__isSelected = false)
      );
      this.selectedSource.pop();
    }
  }

  /**remove links associated to the clicked target item */
  onItemLinkMapRemove(arg: PairItemModel) {
    let mappedLinesToRemove = this.mappedLines.filter(
      (ml) => ml.target.element == arg.element
    );
    mappedLinesToRemove.forEach((ml) => {
      this.removeLast(ml);
    });
  }
}
