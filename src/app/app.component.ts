import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ConnectableItemModel, MappedSourceTargetItem } from './pci-connectables/common/models/item.model';
declare var LeaderLine: any;
declare var AnimEvent: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mapItemsContainerComponent') mapItemsContainerComponent;
  sourceItems: ConnectableItemModel[] = [];
  targetItems: ConnectableItemModel[] = [];
  mappedItems: MappedSourceTargetItem[] = [];
  colors:string[]=[
    'red', 'green', 'blue', 'orange', 'purple'
  ];

  get bodyYOffset(): number {
    return window.pageYOffset;
  }
  
  constructor() {
    let connectorCount = 5;
    for (var x = 0; x < connectorCount; x++) {
      this.sourceItems.push({ data:{id: x, name: 'Left Option ' + x}, displayDataField:'name', color:this.colors[x]});
      this.targetItems.push({ data:{id: x, name: 'Right Option ' + x}, displayDataField:'name' });
    }

    
    this.mappedItems.push(new MappedSourceTargetItem(this.sourceItems[1], this.targetItems[2]));
    this.mappedItems.push(new MappedSourceTargetItem(this.sourceItems[3], this.targetItems[2]));
    this.mappedItems.push(new MappedSourceTargetItem(this.sourceItems[4], this.targetItems[0]));
  }
  
  ngAfterViewInit(): void {
    //this.pciConnectablesContainer.init();
  }

  ngOnDestroy(): void {
    //this.pciConnectablesContainer.removeLines();
  }

  showModal() {
    this.myModal.nativeElement.style.display = 'block';
    this.pciConnectablesContainer.init();
    // setTimeout(() => {
    //   this.pciConnectablesContainer.redraw();
    // }, 500);
  }
  closeModal() {
    this.myModal.nativeElement.style.display = 'none';
    this.pciConnectablesContainer.removeLines();
  }
}
