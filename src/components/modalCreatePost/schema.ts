import { diffYears } from '@formkit/tempo'
import { z } from 'zod'

export const createPostSchema = z.object({
  descriptionPost: z.string().optional(),
})

export type CreatePostData = z.infer<typeof createPostSchema>
