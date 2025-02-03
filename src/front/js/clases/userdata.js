class UserData {
  
    constructor() {
      this._userName = '';
      this._email = '';
      this._password = '';
    }
    
    get userName() {
      return this._userName;
    }
    
    set userName(value) {
      this._userName = value;
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
    
  }

export default UserData;