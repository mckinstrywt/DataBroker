export interface IDataProvider {
  get<T>(resource: string, params?: Record<string, any>): Promise<T>;
  list<T>(resource: string, params?: Record<string, any>): Promise<T[]>;
  create<T>(resource: string, data: any): Promise<T>;
  update<T>(resource: string, id: string, data: any): Promise<T>;
  delete(resource: string, id: string): Promise<void>;
}
