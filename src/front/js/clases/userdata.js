class UserData {
  constructor() {
      this._user_name = "";  
      this._email = "";
      this._password= "";
      this.profile = {};  
      this.user_image = {}; 
      this.routine = {};
      this.workout = {};
  }

  get user_name() {
      return this._user_name;
  }

  set user_name(value) {
      this._user_name = value;
  }

  get email() {
      return this._email;
  }

  set email(value) {
      this._email = value;
  }

  get password() {
      return this._password;
  }

  set password(value) {
      this._password = value;
  }

  get profile() {
    return this._profile;
  }

  set profile(value){
    this._profile = value;
  }

  get user_image() {
    return this._user_image;
  }

  set user_image(value) {
    this._user_image = value;
  }

  get routine() {
    return this._routine;
  }

  set routine(value) {
    this._routine = value
  }
  get workout() {
    return this._workout;
  }

  set workout(value) {
    this._workout = value
  }
  
  toJSON() {
      return {
          user_name: this._user_name,
          email: this._email,
          password_hash: this._password,
          user_image:this._user_image,
          profile: this._profile
      };
  }
}

export default UserData;
