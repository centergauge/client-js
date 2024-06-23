import {graphQLID} from './zod-to-graphql.mjs';
import {z} from 'zod';

export const OrgId = graphQLID(z.string()).uuid();
