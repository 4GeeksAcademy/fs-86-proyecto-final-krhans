class UserData {
  constructor() {
      this._user_name = "";  
      this._email = "";
      this._password = "";
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

  toJSON() {
      return {
          user_name: this._user_name,
          email: this._email,
          password: this._password
      };
  }
}

export default UserData;
