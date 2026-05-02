import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
  url:'postgresql://neondb_owner:npg_iQJXsG36PdjN@ep-restless-rice-a85jcb9l-pooler.eastus2.azure.neon.tech/learning-platform?sslmode=require&channel_binding=require',
  },
});
