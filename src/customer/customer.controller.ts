import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { ValidateIdPipe } from './validations/validateId.pipe';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Res() res,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    const newCustomer = await this.customerService.createCustomer(
      createCustomerDTO,
    );

    return res.status(HttpStatus.CREATED).json(newCustomer);
  }

  @Get()
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    return res.status(HttpStatus.OK).json(customers);
  }

  @Get(':id')
  async getCustomerById(@Res() res, @Param('id', ValidateIdPipe) id) {
    const customer = await this.customerService.getCustomerById(id);

    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  @Put(':id')
  async updateCustomer(
    @Res() res,
    @Param('id', ValidateIdPipe) id,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    const updatedCustomer = await this.customerService.updateCustomer(
      id,
      createCustomerDTO,
    );
    if (!updatedCustomer)
      throw new NotFoundException('Customer does not exist!');

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Customer has been updated' });
  }

  @Delete(':id')
  async deleteCustomer(@Res() res, @Param('id', ValidateIdPipe) id) {
    const deletedCustomer = await this.customerService.deleteCustomer(id);
    if (!deletedCustomer)
      throw new NotFoundException('Customer does not exist!');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Customer has been deleted' });
  }
}
