import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Observable, Subject } from 'rxjs';
import { Category } from '../categories/category';
import { FileDetails } from './file-details';
import { GdriveService } from '../shared/gdrive/gdrive.service';

@Injectable()
export class FileDetailsService {

  private files: FirebaseListObservable<FileDetails[]>;
  private query: Subject<string> = new Subject<string>();
  private fileId: string;
  private fileIds: string[];

  categories: Observable<Category[]>;
  file: Observable<FileDetails>;

  constructor(private database: AngularFireDatabase,
              private gdriveService: GdriveService) {

    this.categories = this.database.list('/categories')
        .map(dbCategories => dbCategories.map(dbCategory => new Category(dbCategory)));

    this.files = this.database.list('/files');

    this.database.list('/files')
        .map(files => {
          return files.map(file => file.id);
        })
        .subscribe(filesIds => {
          this.fileIds = filesIds;
        });

    this.file = this.database
        .list('/files', { query: { orderByKey: true, equalTo: this.query } })
        .map(files => {
          const file = files[0];
          if (file) {
            return new FileDetails(file);
          } else if (this.fileIds.indexOf(this.fileId) === -1) {
            this.gdriveService.openFile(this.fileId)
          }
        });

    this.gdriveService.file
        .map(gdriveFile => new FileDetails(gdriveFile))
        .subscribe(file => {
          if (this.fileIds.indexOf(file.id) === -1) {
            this.saveFile(file);
          }
        });
  }

  saveFile(file: FileDetails): firebase.Promise<void> {
    return this.files.update(file.$key, file.toDbObject());
  }

  updateFileId(id: string) {
    this.fileId = id;
    this.query.next(id);
  }
}
