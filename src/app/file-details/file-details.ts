export class FileDetails {
  id: string;
  name: string;
  date?: string;
  thumbnailLink?: string;
  categories: Array<string>;

  constructor(dbFile?: any) {
    this.id = dbFile.id || null;
    this.name = dbFile.name || null;
    this.date = dbFile.date || null;
    this.thumbnailLink = dbFile.thumbnailLink || null;
    this.categories = dbFile.categories || [];
  }
}

