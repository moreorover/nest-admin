import { PaginatedResult } from './models/paginated-result';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations = []): Promise<any> {
    return this.repository.find({ relations });
  }

  async paginate(page = 1, relations = []): Promise<PaginatedResult> {
    const take = 15;

    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations,
    });

    return {
      data: data,
      meta: { total, page, last_page: Math.ceil(total / take) },
    };
  }

  async create(data): Promise<any> {
    return this.repository.save(data);
  }

  async findOne(condition, relations = []): Promise<any> {
    return this.repository.findOne(condition, { relations });
  }

  async update(id: string, data): Promise<any> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return this.repository.delete(id);
  }
}
