import { Persistible } from '../shared/database/persistible';
export class Configuration implements Persistible {
  rootFolderId: string = '';
  rootFolderName: string = '';

  constructor(dbObject?: any) {
    if (dbObject) {
      this.rootFolderId = dbObject.rootFolderId;
      this.rootFolderName = dbObject.rootFolderName;
    }
  }

  toDbObject(): any {
    return undefined;
  }
}
