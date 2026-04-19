# DataBroker

A pluggable data layer SDK that lets applications switch between different data sources through a common interface.

## Goal

Support multiple provider types behind one contract:

- REST API provider
- Local mock provider
- Database provider

## Design principles

- One common interface for reads and writes
- Provider-specific mapping isolated behind adapters
- Strong typing at the boundary
- Easy local testing with mock data
- Configuration-based provider selection

## Proposed layout

```text
src/
  core/
    IDataProvider.ts
    DataBroker.ts
    types.ts
  providers/
    mock/
      MockProvider.ts
    rest/
      RestProvider.ts
    database/
      DatabaseProvider.ts
  mappers/
    Mapper.ts
examples/
  basic-usage.ts
docs/
  prd.md
```

## MVP scope

1. Define a shared provider contract
2. Implement mock, REST, and database provider stubs
3. Add a broker/factory for provider selection
4. Include a working usage example
5. Document extension points for new providers

## Next steps

- Flesh out the provider contract
- Add request/response typing patterns
- Implement source-specific adapters
- Add tests and packaging metadata
