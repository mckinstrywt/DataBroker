import { IDataProvider } from '../../core/IDataProvider';

export class CsvProvider implements IDataProvider {
  private store: Record<string, any[]> = {};

  constructor(csvContentByResource: Record<string, string> = {}) {
    Object.entries(csvContentByResource).forEach(([resource, csv]) => {
      this.store[resource] = this.parseCsv(csv);
    });
  }

  async get<T>(resource: string, params?: Record<string, any>): Promise<T> {
    const items = this.store[resource] || [];

    if (params?.id) {
      const found = items.find((item) => String(item.id) === String(params.id));
      if (!found) {
        throw new Error(`CsvProvider: ${resource} with id ${params.id} not found`);
      }
      return found as T;
    }

    if (items.length === 0) {
      throw new Error(`CsvProvider: no data found for resource ${resource}`);
    }

    return items[0] as T;
  }

  async list<T>(resource: string, params?: Record<string, any>): Promise<T[]> {
    const items = this.store[resource] || [];

    if (!params) {
      return items as T[];
    }

    return items.filter((item) => {
      return Object.entries(params).every(([key, value]) => String(item[key]) === String(value));
    }) as T[];
  }

  async create<T>(_resource: string, _data: any): Promise<T> {
    throw new Error('CsvProvider is read-only. Create is not supported.');
  }

  async update<T>(_resource: string, _id: string, _data: any): Promise<T> {
    throw new Error('CsvProvider is read-only. Update is not supported.');
  }

  async delete(_resource: string, _id: string): Promise<void> {
    throw new Error('CsvProvider is read-only. Delete is not supported.');
  }

  private parseCsv(csv: string): any[] {
    const lines = csv
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      return [];
    }

    const headers = lines[0].split(',').map((header) => header.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(',').map((value) => value.trim());
      const row: Record<string, string> = {};

      headers.forEach((header, index) => {
        row[header] = values[index] ?? '';
      });

      return row;
    });
  }
}
