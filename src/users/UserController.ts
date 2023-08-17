import { Request, Response } from 'express';
import { UserService } from './UserService';
import { IUser } from './UserSchema';

class UserController {

    static instance: UserController;

    constructor() {
      if (UserController.instance) {
        return UserController.instance;
      }
      
      UserController.instance = this;
    }

  static async registeUser(req: Request, res: Response) {
    const userData: IUser = req.body;

    try {
      const newUser: IUser = await UserService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserInformation(req: Request, res: Response): Promise<void> {
    
  }

  static async userLogin(req: Request, res: Response): Promise<void> {

  }

  static async updateProfile(req: Request, res: Response): Promise<void> {

  }

  static async validatorEmail(req: Request, res: Response): Promise<void> {

  }

  static async validatorNickNmae(req: Request, res: Response): Promise<void> {

  }

  static async withdrawUser(req: Request, res: Response): Promise<void> {

  }
}

export default UserController;