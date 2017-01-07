export class GdriveFile {
  id: string;
  mimeType: string;
  name: string;
  parentId: string;
  selected?: boolean;

  constructor(file: gapi.client.drive.File, parentId: string) {
    this.id = file.id;
    this.mimeType = file.mimeType;
    this.name = file.name;
    this.parentId = parentId;
  }
}
