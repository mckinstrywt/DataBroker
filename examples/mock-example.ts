import { DataBroker } from '../src/core/DataBroker';
import { MockProvider } from '../src/providers/mock/MockProvider';

interface User {
  id: string;
  name: string;
  role: string;
}

const seedData = {
  users: [
    { id: '1', name: 'Alice', role: 'admin' },
    { id: '2', name: 'Bob', role: 'user' },
  ],
};

async function run() {
  const provider = new MockProvider(seedData);
  const broker = new DataBroker(provider);

  const users = await broker.list<User>('users');
  console.log('All users:', users);

  const user = await broker.get<User>('users', { id: '1' });
  console.log('Single user:', user);

  const created = await broker.create<User>('users', {
    name: 'Charlie',
    role: 'user',
  });
  console.log('Created:', created);

  const updated = await broker.update<User>('users', created.id, {
    role: 'power-user',
  });
  console.log('Updated:', updated);

  await broker.delete('users', created.id);
  console.log('Deleted user:', created.id);
}

run();
