# DataBroker

A pluggable data layer SDK that lets applications switch between different data sources through a common interface.

## Goal

Support multiple provider types behind one contract:

- REST API provider
- Local mock provider
- Database provider
- CSV file provider (read-only)

## Design principles

- One common interface for reads and writes
- Provider-specific mapping isolated behind adapters
- Strong typing at the boundary
- Easy local testing with mock data or CSV
- Configuration-based provider selection

## Proposed layout

```text
src/
  core/
    IDataProvider.ts
    DataBroker.ts
  providers/
    mock/
      MockProvider.ts
    csv/
      CsvProvider.ts
    rest/
      RestProvider.ts
    database/
      DatabaseProvider.ts
examples/
  mock-example.ts
```

## Providers

### MockProvider
- In-memory data store
- Full CRUD support
- Ideal for testing and UI development

### CsvProvider
- Loads data from CSV strings
- Read-only (no create, update, delete)
- Useful for quick datasets and offline scenarios

## Example

```ts
const csv = `id,name,role
1,Alice,admin
2,Bob,user`;

const provider = new CsvProvider({ users: csv });
const broker = new DataBroker(provider);

const users = await broker.list('users');
```

## MVP scope

1. Define a shared provider contract
2. Implement mock, CSV, REST, and database provider stubs
3. Add a broker/factory for provider selection
4. Include working usage examples
5. Document extension points for new providers

## Next steps

- Add provider factory (config driven)
- Add REST provider
- Add database provider (Oracle focus)
- Add tests and packaging metadata
