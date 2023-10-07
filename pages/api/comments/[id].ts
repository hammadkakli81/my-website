import { NextApiHandler } from 'next';

import {
  commentUpdateValidationSchema,
  validateSchema,
} from '../../../validators';
import { catchAsync } from '../../../utils/catch-async';
import { Comment } from '../../../models/comment';
import { connectDB } from '../../../utils/connect-db';
import { requireUser } from '../../../utils';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      return updateComment(req, res);

    case 'DELETE':
      return deleteComment(req, res);

    default:
      const error = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const updateComment = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);
  const commentId = req.query.id as string;
  const data = await validateSchema(commentUpdateValidationSchema, req.body);

  await connectDB();

  if (user.role === 'admin') {
    // no need to check for owner
    // when admin is updating it, don't delete the likes and replies
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { content: data.content } },
      { runValidators: true, new: true }
    );

    if (!comment) {
      throw new Error("Comment not found, or you don't own the comment");
    }

    return res.status(200).send({ comment });
  }

  // if the comment is updated, delete all the likes
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, owner: user.id },
    { $set: { content: data.content, likes: [] } },
    { runValidators: true, new: true }
  );

  if (!comment) {
    throw new Error("Comment not found, or you don't own the comment");
  }

  // if the comment is updated, delete all its replies
  await Comment.deleteMany({ repliedTo: comment.id });

  res.status(200).send({ comment });
});

const deleteComment = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);
  const commentId = req.query.id as string;
  await connectDB();

  if (user.role === 'admin') {
    // no need to check for owner
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found, or you don't own the comment");
    }

    const promises: Promise<any>[] = [
      comment.deleteOne(),
      Comment.deleteMany({ repliedTo: comment.id }),
    ];

    await Promise.all(promises);
    return res.status(204).send(null);
  }

  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  });
  if (!comment) {
    throw new Error("Comment not found, or you don't own the comment");
  }

  const promises: Promise<any>[] = [
    comment.deleteOne(),
    Comment.deleteMany({ repliedTo: comment.id }),
  ];

  await Promise.all(promises);
  res.status(204).send(null);
});

export default handler;
