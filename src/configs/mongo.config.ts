import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const mongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: configService.get('MONGO_URI'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};
