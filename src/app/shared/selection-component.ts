import { GdriveFile } from './gdrive/gdrive-file';
import { BaseComponent } from '../core/base.component';

export class SelectionComponent extends BaseComponent {

  selectedItem: GdriveFile;

  toggleSelection(item): void {

    if (this.selectedItem) {
      this.selectedItem.selected = false;
    }

    if (this.selectedItem === item) {
      this.selectedItem = null;
      item.selected = false;
    } else {
      this.selectedItem = item;
      item.selected = true;
    }
  }
}
