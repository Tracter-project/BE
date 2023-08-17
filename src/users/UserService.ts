import User, { IUser } from './UserSchema';

export class UserService {

  static instance: UserService;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }
    
    UserService.instance = this;
  }

  static async createUser(userData: IUser) {
    try {
      const newUser: IUser = new User(userData);
      return await newUser.save();
    } catch(error) {
      throw error;
    }
  }

}