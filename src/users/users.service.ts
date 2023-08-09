import {
  Injectable
} from '@nestjs/common';
import {
  InjectModel
} from '@nestjs/mongoose';
import {
  Model
} from 'mongoose';
import {
  CreateUsersDto
} from './dto/create-user.dto';
import {
  UpdateUsersDto
} from './dto/update-user.dto';
import {
  Users,
  UsersDocument
} from './schema/users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users.name) private readonly UsersModel: Model < UsersDocument > ) {}

  async create(createusersDto: CreateUsersDto): Promise < UsersDocument > {
    const Users = new this.UsersModel(createusersDto);
    return Users.save();
  }

  async findAll(): Promise < UsersDocument[] > {
    return this.UsersModel.find()
      .exec();
  }

  async findOne(id: string) {
    return this.UsersModel.findById(id);
  }

  async update(id: string, updateusersDto: UpdateUsersDto): Promise < UsersDocument > {
    return this.UsersModel.findByIdAndUpdate(id, updateusersDto);
  }

  async remove(id: string) {
    return this.UsersModel.findByIdAndRemove(id);
  }
}