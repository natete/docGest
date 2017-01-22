import { Persistible } from '../shared/database/persistible';
export class FileDetails implements Persistible {
  $key: string;
  id: string;
  name: string;
  date?: string;
  thumbnailLink?: string;
  categories: Array<string>;

  constructor(dbFile?: any) {
    this.$key = dbFile.$key || dbFile.id;
    this.id = dbFile.id || null;
    this.name = dbFile.name || null;
    this.date = dbFile.date || null;
    this.thumbnailLink = dbFile.thumbnailLink || null;
    this.categories = dbFile.categories ? dbFile.categories.split(',') : [];
  }

  toDbObject(): any {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
      thumbnailLink: this.thumbnailLink,
      categories: this.categories.join(',')
    }
  }
}

