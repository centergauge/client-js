import {graphQLID} from './zod-to-graphql.js';
import {z} from 'zod';

export const OrgId = graphQLID(z.string()).uuid();
