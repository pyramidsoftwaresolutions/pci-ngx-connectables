import { Component, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { ConnectableItemModel, PairItemModel, MappedLineAndPairItem, MappedSourceTargetItem } from '../common/models/item.model';
declare var LeaderLine: any;
declare var AnimEvent: any;

@Component({
  selector: 'pci-connectables-container',
  templateUrl: './items.container.component.html'
})
export class ItemsContainerComponent implements AfterViewInit {
  @Input() sourceItems: ConnectableItemModel[] = [];
  @Input() targetItems: ConnectableItemModel[] = [];
  @Input() mappedItems: MappedSourceTargetItem[]=[];
  @Input() sourceSelectionMode:string='Single'; //or Multiple
  @Input() targetSelectionMode: string='Single';
  //================================
  @ViewChild('scrollableBox') scrollableBox: ElementRef;
  leftContainers: PairItemModel[] = [];
  rightContainers: PairItemModel[] = [];

  selectedSource: {element:HTMLElement, item:ConnectableItemModel}[]=[];
  mappedLines: MappedLineAndPairItem[] = [];

  /**call to get mapped source and target items */
  public getMappedItems():MappedSourceTargetItem[]{
    let output:MappedSourceTargetItem[]=[];
    this.mappedLines.forEach(ml=>{
      output.push({source:ml.source.item, target:ml.target.item});
    })
    return output;
  }

  leftItemRendered(arg: PairItemModel) {
    this.leftContainers.push(arg);
  }
  rightItemRendered(arg: PairItemModel) {
    this.rightContainers.push(arg);
  }

  onRemove(){
    let mappedItem = this.mappedLines.pop();
    if(mappedItem){
      mappedItem.line.remove();
    }
  }

  private drawConnectors(source:PairItemModel, target:PairItemModel) {
    const line = new LeaderLine(
      source.element,
      target.element,
      {
        startPlug: 'square',
        endPlug: 'arrow',
        size:2
      }
    );
    if(source.item.color){
      line.color = source.item.color;
    }
    this.mappedLines.push(new MappedLineAndPairItem(line, source, target));
  }

  /**call this function from consumer components */
  public init():void {
    var ____this = this;
    this.scrollableBox.nativeElement.addEventListener(
      'scroll',
      AnimEvent.add(function () {
        ____this.mappedLines.forEach((l) => l.line.position());
      }),
      false
    );
    //assuming that all the items HTML cards must have already rendered
    this.initializeMappedLinks();
  }

  private initializeMappedLinks():void{
    this.mappedItems.forEach(mi=>{
      let srcItem:PairItemModel = this.leftContainers.find(lc=>lc.item == mi.source);
      let trgItem:PairItemModel = this.rightContainers.find(rc=>rc.item==mi.target);
      if(srcItem && trgItem){
        this.drawConnectors(srcItem, trgItem);
      }
    });
    this.mappedLines.forEach((l) => l.line.position());
  }

  onSourceSelected(arg:{item:ConnectableItemModel, element:HTMLElement}){
    if(this.sourceSelectionMode.toLowerCase()=='single'){
      this.sourceItems.forEach(x=>x.__isSelected=false);
      this.selectedSource=[arg];
    }
    else if(this.sourceSelectionMode.toLowerCase()=='Multiple'){
      if(this.selectedSource.findIndex(x=>x.element==arg.element)<0){
        this.selectedSource.push(arg);
      }
    }
    arg.item.__isSelected=true;
  }

  onTargetSelected(arg:{item:ConnectableItemModel, element:HTMLElement}){
    if(this.targetSelectionMode.toLowerCase()=='single'){
      this.targetItems.forEach(x=>x.__isSelected=false);
    }
    if(this.selectedSource && arg.element){
      this.selectedSource.forEach(src=>{
        this.drawConnectors(src, arg);
      });
      this.mappedLines.forEach((l) => l.line.position());
    }  
    arg.item.__isSelected=true;  
  }

}
