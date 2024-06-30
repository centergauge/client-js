import {graphQLID} from './zod-to-graphql.js';
import {z} from 'zod';

export const OrgId = graphQLID(z.string()).uuid();

export const Org = z.object({
  id: OrgId,
  slug: z.string().min(3).max(30),
  name: z.string().min(3).max(60),
  lightIcon: z.string().url().optional(),
  darkIcon: z.string().url().optional(),
  publicSignInEnabled: z.boolean().optional(),
  publicSupportEnabled: z.boolean().optional(),
});
export type Org = z.infer<typeof Org>;
