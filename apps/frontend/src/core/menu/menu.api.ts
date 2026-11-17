import { z } from 'zod';
import { createProductSchema } from '@app/shared';

const menuResponseSchema = z.object({
	success: z.literal(true),
	message: z.string(),
	data: z.object({
		meals: z.array(createProductSchema),
		drinks: z.array(createProductSchema),
	}),
});
