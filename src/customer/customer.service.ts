import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    return customers;
  }

  async getCustomerById(id: string): Promise<Customer> {
    const costumer = await this.customerModel.findById(id).exec();
    return costumer;
  }

  async createCustomer(createCustomerDT: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDT);
    return newCustomer.save();
  }

  async updateCustomer(
    id: string,
    createCustomerDT: CreateCustomerDTO,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, createCustomerDT)
      .exec();
    return updatedCustomer;
  }

  async deleteCustomer(id: string): Promise<any> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(id);
    return deletedCustomer;
  }
}
