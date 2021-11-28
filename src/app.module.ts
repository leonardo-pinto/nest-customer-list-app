import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/customer-app', {
      useNewUrlParser: true,
    }),
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
