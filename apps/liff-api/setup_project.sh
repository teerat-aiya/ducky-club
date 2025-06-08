#!/bin/bash

# Create src directory and its subdirectories
mkdir -p src/{config,middleware,routes}

# Create individual files

# src/index.ts
cat << EOF > src/index.ts
import { Hono } from 'hono';
import { authMiddleware } from './middleware/auth';
import { authRoutes } from './routes/auth';
import { itemRoutes } from './routes/items';
import { adminRoutes } from './routes/admin';

const app = new Hono();

app.use('*', authMiddleware);
app.route('/auth', authRoutes);
app.route('/items', itemRoutes);
app.route('/admin', adminRoutes);

export default app;
EOF

# src/config/directus.ts
cat << EOF > src/config/directus.ts
import { createDirectus, rest, authentication } from '@directus/sdk';

const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055';

export const directusClient = createDirectus(directusUrl)
  .with(rest())
  .with(authentication());

export const directusAdminClient = createDirectus(directusUrl)
  .with(rest())
  .with(authentication());
EOF

# src/middleware/auth.ts
cat << EOF > src/middleware/auth.ts
import { Context, Next } from 'hono';
import { directusClient } from '../config/directus';

export async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header('Authorization');
  if (!token) {
    return c.json({ error: 'No token provided' }, 401);
  }
  try {
    await directusClient.request(() => Promise.resolve()); // Validates the token
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
}
EOF

# src/routes/auth.ts
cat << EOF > src/routes/auth.ts
import { Hono } from 'hono';
import { directusClient } from '../config/directus';

const authRoutes = new Hono();

authRoutes.post('/login', async (c) => {
  const { email, password } = await c.req.json();
  try {
    const auth = await directusClient.login(email, password);
    return c.json({ token: auth.access_token });
  } catch (error) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }
});

authRoutes.post('/refresh', async (c) => {
  const refreshToken = c.req.header('Refresh-Token');
  if (!refreshToken) {
    return c.json({ error: 'No refresh token provided' }, 400);
  }
  try {
    const auth = await directusClient.refresh();
    return c.json({ token: auth.access_token });
  } catch (error) {
    return c.json({ error: 'Invalid refresh token' }, 401);
  }
});

authRoutes.post('/logout', async (c) => {
  try {
    await directusClient.logout();
    return c.json({ message: 'Logged out successfully' });
  } catch (error) {
    return c.json({ error: 'Logout failed' }, 500);
  }
});

export { authRoutes };
EOF

# src/routes/items.ts
cat << EOF > src/routes/items.ts
import { Hono } from 'hono';
import { directusClient } from '../config/directus';
import { readItems, createItem, updateItem, deleteItem } from '@directus/sdk';

const itemRoutes = new Hono();

itemRoutes.get('/:collection', async (c) => {
  const collection = c.req.param('collection');
  try {
    const items = await directusClient.request(readItems(collection));
    return c.json(items);
  } catch (error) {
    return c.json({ error: 'Failed to fetch items' }, 500);
  }
});

itemRoutes.post('/:collection', async (c) => {
  const collection = c.req.param('collection');
  const body = await c.req.json();
  try {
    const item = await directusClient.request(createItem(collection, body));
    return c.json(item, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create item' }, 500);
  }
});

itemRoutes.patch('/:collection/:id', async (c) => {
  const collection = c.req.param('collection');
  const id = c.req.param('id');
  const body = await c.req.json();
  try {
    const item = await directusClient.request(updateItem(collection, id, body));
    return c.json(item);
  } catch (error) {
    return c.json({ error: 'Failed to update item' }, 500);
  }
});

itemRoutes.delete('/:collection/:id', async (c) => {
  const collection = c.req.param('collection');
  const id = c.req.param('id');
  try {
    await directusClient.request(deleteItem(collection, id));
    return c.json({ message: 'Item deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete item' }, 500);
  }
});

export { itemRoutes };
EOF

# src/routes/admin.ts
cat << EOF > src/routes/admin.ts
import { Hono } from 'hono';
import { directusAdminClient } from '../config/directus';
import { readUsers } from '@directus/sdk';

const adminRoutes = new Hono();

adminRoutes.post('/login', async (c) => {
  const { email, password } = await c.req.json();
  try {
    const auth = await directusAdminClient.login(email, password);
    return c.json({ token: auth.access_token });
  } catch (error) {
    return c.json({ error: 'Invalid admin credentials' }, 401);
  }
});

adminRoutes.get('/users', async (c) => {
  try {
    const users = await directusAdminClient.request(readUsers());
    return c.json(users);
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

export { adminRoutes };
EOF

echo "Project structure and files have been created successfully!"