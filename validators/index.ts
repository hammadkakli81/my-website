import { isValidObjectId } from 'mongoose';
import { Schema, z } from 'zod';

export const commentCreateValidationSchema = z.object({
  belongsTo: z.string().refine(isValidObjectId),
  content: z.string(),
});

export const commentUpdateValidationSchema = z.object({ content: z.string() });

export const getCommentsValidationSchema = z.object({
  // this is 'postId'
  belongsTo: z.string().refine(isValidObjectId),
});

export const replyToCommentValidationSchema = z.object({
  repliedTo: z.string().refine(isValidObjectId),
  content: z.string(),
});

export const commentUpdateLikeSchema = z.object({
  commentId: z.string().refine(isValidObjectId),
});

export const validateSchema = async <T extends Schema>(
  schema: T,
  value: any
): Promise<z.infer<typeof schema>> => {
  const results = await schema.safeParseAsync(value);
  if (!results.success) {
    return new Error(results.error.message);
  }

  return results.data;
};
