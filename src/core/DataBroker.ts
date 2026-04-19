import { IDataProvider } from './IDataProvider';

export class DataBroker {
  private provider: IDataProvider;

  constructor(provider: IDataProvider) {
    this.provider = provider;
  }

  get<T>(resource: string, params?: Record<string, any>) {
    return this.provider.get<T>(resource, params);
  }

  list<T>(resource: string, params?: Record<string, any>) {
    return this.provider.list<T>(resource, params);
  }

  create<T>(resource: string, data: any) {
    return this.provider.create<T>(resource, data);
  }

  update<T>(resource: string, id: string, data: any) {
    return this.provider.update<T>(resource, id, data);
  }

  delete(resource: string, id: string) {
    return this.provider.delete(resource, id);
  }
}
