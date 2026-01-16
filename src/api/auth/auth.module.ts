import {Module} from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { GuardModule } from "src/module";


@Module({
  imports: [UserModule,GuardModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
