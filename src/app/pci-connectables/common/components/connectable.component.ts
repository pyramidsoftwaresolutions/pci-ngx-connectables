import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ConnectableItemModel, PairItemModel } from '../models/item.model';
declare var PlainDraggable:any;
declare var traceLog:any;

@Component({
  selector: 'pci-connectable',
  templateUrl: 'connectable.component.html',
  styleUrls: ['connectable.component.scss']
})
export class ConnectableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item:ConnectableItemModel;
  @Input() draggable:boolean=true;
  
  @ViewChild('draggable') containerElement:ElementRef;
  @Output() rendered:EventEmitter<PairItemModel> = new EventEmitter<PairItemModel>();
  @Output() dragging:EventEmitter<any> = new EventEmitter<any>();
  @Output() dragend:EventEmitter<any> = new EventEmitter<any>();
  @Output() selected:EventEmitter<any> = new EventEmitter<any>();
  draggableEle:any;
  dragData:{started?:boolean, ended?:boolean, startPosition?:any, endPosition?:any, movingPosition?:any}={};

  constructor() { 

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    var ____this=this;
    if(this.draggable){
      this.draggableEle = new PlainDraggable(this.containerElement.nativeElement);
      this.draggableEle.onDrag = function(newPosition) {
        //traceLog.add(newPosition);
        ____this.dragData.started=true;
        ____this.dragData.ended=false;
        ____this.dragData.startPosition=newPosition;
        ____this.dragData.endPosition=undefined;
      };
      this.draggableEle.onMove = function(newPosition) {
        traceLog.add(newPosition);
        ____this.dragData.movingPosition=newPosition;
        ____this.dragging.emit(____this.dragData);
      };
      this.draggableEle.onDragEnd = function(newPosition) {
        //traceLog.add(newPosition);
        ____this.dragData.ended=true;
        ____this.dragData.endPosition=newPosition;
        ____this.dragend.emit(____this.dragData);
      };
    }
    let arg = new PairItemModel(this.item, this.containerElement.nativeElement);
    this.rendered.emit(arg);
  }
  ngOnChanges(){
  }

  ngOnDestroy(){
    if(this.draggableEle){
      this.draggableEle.remove();
    }
  }

  onItemSelected(evt:any){
    let arg = new PairItemModel(this.item, this.containerElement.nativeElement);
    this.selected.emit(arg);
  }
}
