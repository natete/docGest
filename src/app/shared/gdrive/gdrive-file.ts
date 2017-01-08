export class GdriveFile {
  id: string;
  name: string;
  mimeType?: string;
  thumbnailLink?: string;
  parentId?: string;
  parentName?: string;
  selected?: boolean;

  constructor(file: gapi.client.drive.File, parent?: gapi.client.drive.File) {
    this.id = file.id;
    this.name = file.name;
    this.mimeType = file.mimeType ? file.mimeType : null;
    this.thumbnailLink = file.thumbnailLink ? file.thumbnailLink : null;
    this.parentId = parent ? parent.id : null;
    this.parentName = parent ? parent.name : null;
  }
}
