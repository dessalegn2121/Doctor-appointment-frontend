import { zodResolver as zodResolverFn } from '@hookform/resolvers/zod';
export const zodResolver = (schema) => zodResolverFn(schema);
