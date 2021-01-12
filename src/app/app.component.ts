import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  ConnectableItemModel,
  MappedSourceTargetItem,
} from './pci-connectables/common/models/item.model';
declare var LeaderLine: any;
declare var AnimEvent: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pciConnectablesContainer1') pciConnectablesContainer1;
  @ViewChild('pciConnectablesContainer2') pciConnectablesContainer2;
  @ViewChild('myModal') myModal;

  sourceItems: ConnectableItemModel[] = [];
  targetItems: ConnectableItemModel[] = [];
  mappedItems: MappedSourceTargetItem[] = [];

  sourceItems2: ConnectableItemModel[] = [];
  targetItems2: ConnectableItemModel[] = [];
  mappedItems2: MappedSourceTargetItem[] = [];
  colors: string[] = ['red', 'green', 'blue', 'orange', 'purple'];

  get bodyYOffset(): number {
    return window.pageYOffset;
  }
  constructor() {
    let connectorCount = 50;
    for (var x = 0; x < connectorCount; x++) {
      this.sourceItems.push({
        data: { id: x, name: 'Left Option ' + x },
        displayDataField: 'name',
        color: this.colors[x],
      });
      this.targetItems.push({
        data: { id: x, name: 'Right Option ' + x },
        displayDataField: 'name',
      });

      this.sourceItems2.push({
        data: { id: x, name: 'Left Option ' + x },
        displayDataField: 'name',
        color: this.colors[x],
      });
      this.targetItems2.push({
        data: { id: x, name: 'Right Option ' + x },
        displayDataField: 'name',
      });
    }

    this.mappedItems.push(
      new MappedSourceTargetItem(this.sourceItems[1], this.targetItems[1])
    );
    this.mappedItems.push(
      new MappedSourceTargetItem(this.sourceItems[3], this.targetItems[2])
    );
    this.mappedItems.push(
      new MappedSourceTargetItem(this.sourceItems[4], this.targetItems[0])
    );
    this.mappedItems.push(
      new MappedSourceTargetItem(this.sourceItems[10], this.targetItems[3])
    );
    this.mappedItems.push(
      new MappedSourceTargetItem(this.sourceItems[49], this.targetItems[45])
    );

    this.mappedItems2.push(
      new MappedSourceTargetItem(this.sourceItems2[1], this.targetItems2[1])
    );
  }

  ngAfterViewInit(): void {
    //this.pciConnectablesContainer.init();
  }

  ngOnDestroy(): void {
    //this.pciConnectablesContainer.removeLines();
  }

  showModal() {
    this.myModal.nativeElement.style.display = 'block';
    this.pciConnectablesContainer1.init();
    this.pciConnectablesContainer2.init();
  }
  closeModal() {
    this.myModal.nativeElement.style.display = 'none';
    this.pciConnectablesContainer1.removeLines();
    this.pciConnectablesContainer2.removeLines();
  }

  onMapped(arg: {
    source: ConnectableItemModel;
    target: ConnectableItemModel;
  }) {
    alert(
      arg.source.data[arg.source.displayDataField] +
        ' --> ' +
        arg.target.data[arg.target.displayDataField]
    );
  }
}
