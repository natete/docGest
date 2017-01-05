export class User {
  name: string;
  email: string;
  photoUrl: string;

  constructor(googleUser?: any) {
    if (googleUser) {
      this.name = googleUser.auth.displayName;
      this.email = googleUser.auth.email;
      this.photoUrl = googleUser.auth.photoURL;
    }
  }
}