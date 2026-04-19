import { IDataProvider } from '../../core/IDataProvider';

export class MockProvider implements IDataProvider {
  private store: Record<string, any[]>;

  constructor(seedData: Record<string, any[]> = {}) {
    this.store = seedData;
  }

  async get<T>(resource: string, params?: Record<string, any>): Promise<T> {
    const items = this.store[resource] || [];

    if (params?.id) {
      const found = items.find((item) => String(item.id) === String(params.id));
      if (!found) {
        throw new Error(`MockProvider: ${resource} with id ${params.id} not found`);
      }
      return found as T;
    }

    if (items.length === 0) {
      throw new Error(`MockProvider: no data found for resource ${resource}`);
    }

    return items[0] as T;
  }

  async list<T>(resource: string, params?: Record<string, any>): Promise<T[]> {
    const items = this.store[resource] || [];

    if (!params) {
      return items as T[];
    }

    const filtered = items.filter((item) => {
      return Object.entries(params).every(([key, value]) => item[key] === value);
    });

    return filtered as T[];
  }

  async create<T>(resource: string, data: any): Promise<T> {
    if (!this.store[resource]) {
      this.store[resource] = [];
    }

    const newItem = {
      id: data.id ?? crypto.randomUUID(),
      ...data,
    };

    this.store[resource].push(newItem);
    return newItem as T;
  }

  async update<T>(resource: string, id: string, data: any): Promise<T> {
    const items = this.store[resource] || [];
    const index = items.findIndex((item) => String(item.id) === String(id));

    if (index === -1) {
      throw new Error(`MockProvider: ${resource} with id ${id} not found`);
    }

    const updated = {
      ...items[index],
      ...data,
      id,
    };

    items[index] = updated;
    return updated as T;
  }

  async delete(resource: string, id: string): Promise<void> {
    const items = this.store[resource] || [];
    const index = items.findIndex((item) => String(item.id) === String(id));

    if (index === -1) {
      throw new Error(`MockProvider: ${resource} with id ${id} not found`);
    }

    items.splice(index, 1);
  }
}
