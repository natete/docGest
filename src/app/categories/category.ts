import { Persistible } from '../shared/database/persistible';

export class Category implements Persistible {
  $key?: string;
  name: string;
  path: string = '';
  namesPath: string = '';
  children: Array<Category> = [];

  constructor(dbCategory?: any) {
    if (dbCategory) {
      this.$key = dbCategory.$key;
      this.name = dbCategory.name;
      this.path = dbCategory.path;
      this.namesPath = dbCategory.namesPath;
    }
  }

  getPath(): string {
    return this.namesPath
        .substring(1, this.namesPath.length - 1)
        .split(',')
        .filter(str => !!str)
        .reverse()
        .concat(this.name)
        .join(' - ');
  }

  getFullPath(): string {
    const path = this.path
        .substring(1, this.path.length - 1)
        .split(',')
        .filter(str => !!str)
        .concat(this.$key)
        .join(',');

    return ',' + path + ',';
  }

  getFullNamesPath(): string {
    const path = this.namesPath
        .substring(1, this.namesPath.length - 1)
        .split(',')
        .filter(str => !!str)
        .concat(this.name)
        .join(',');

    return ',' + path + ',';
  }

  getParentId(): string {
    return this.path
        .substring(1, this.path.length - 1)
        .split(',')[0];
  }

  hasParent(): boolean {
    return !!this.path;
  }

  getNumberOfParents(): number {
    return this.namesPath
        .substring(1, this.path.length - 1)
        .split(',')
        .filter(str => !!str)
        .length;
  }

  toDbObject(): any {
    return {
      name: this.name,
      path: this.path,
      namesPath: this.namesPath
    };
  }
}
