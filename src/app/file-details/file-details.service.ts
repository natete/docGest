import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Category } from '../categories/category';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { FileDetails } from './file-details';
import { GdriveService } from '../shared/gdrive/gdrive.service';

@Injectable()
export class FileDetailsService {

  private files: FirebaseListObservable<FileDetails[]>;
  private query: ReplaySubject<string> = new ReplaySubject<string>(1);
  private fileSubject = new Subject<FileDetails>();
  private fileId: string;
  private currentKey: string;

  categories: FirebaseListObservable<Category[]>;
  file: Observable<FileDetails> = this.fileSubject.asObservable();

  constructor(private database: AngularFireDatabase,
              private gdriveService: GdriveService) {

    this.categories = this.database.list('/categories');

    this.query.subscribe(fileId => this.fileId = fileId);

    this.files = this.database.list('/files');

    this.database
        .list('/files', { query: { orderByChild: 'id', equalTo: this.query } })
        .map(files => files[0])
        .subscribe(file => {
          if (file) {
            this.currentKey = file.$key;
            this.fileSubject.next(new FileDetails(file));
          } else {
            this.getGdriveFile();
          }
        });
  }

  getGdriveFile(): void {
    this.gdriveService.getFile(this.fileId)
        .subscribe(gdriveFile => {
          this.currentKey = null;
          this.fileSubject.next(new FileDetails(gdriveFile));
        });
  }

  saveFile(file: FileDetails) {
    if (this.currentKey) {
      this.files.update(this.currentKey, file);
    } else {
      this.files.push(file);
    }
  }

  updateFileId(id: string) {
    this.query.next(id);
  }

}
