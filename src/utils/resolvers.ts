import { zodResolver as zodResolverFn } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';

export const zodResolver = (schema: ZodSchema) => zodResolverFn(schema);
