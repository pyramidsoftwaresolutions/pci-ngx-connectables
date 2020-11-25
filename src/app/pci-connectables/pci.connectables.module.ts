import { NgModule } from '@angular/core';
import { ConnectableComponent } from './common/components/connectable.component';
import { DraggableDirective } from './common/directives/draggable.directive';
import { ConnectableDirective } from './common/directives/connectable.directive';
import { ItemsContainerComponent } from './container/items.container.component';
import { CommonModule } from '@angular/common';
//import { ConnectableItemModel } from './common/models/item.model';

@NgModule({
  imports:[
    CommonModule
  ],
  declarations: [
    ConnectableComponent,
    DraggableDirective,
    ConnectableDirective,
    ItemsContainerComponent
  ],
  exports:[
    ConnectableComponent,
    DraggableDirective,
    ConnectableDirective,
    ItemsContainerComponent
  ]
})
export class PciConnectablesModule { }
