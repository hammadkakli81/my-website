import { NextApiHandler } from 'next';
import { catchAsync } from '../../../utils/catch-async';
import { requireUser } from '../../../utils';
import {
  replyToCommentValidationSchema,
  validateSchema,
} from '../../../validators';
import { connectDB } from '../../../utils/connect-db';
import { Comment } from '../../../models/comment';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return addReplyToComment(req, res);

    default:
      const error = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const addReplyToComment = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);

  const data = await validateSchema(replyToCommentValidationSchema, req.body);

  await connectDB();

  if (!(await Comment.findOne({ _id: data.repliedTo, chiefComment: true }))) {
    throw new Error('Comment to which this comment replied to not found');
  }

  const parentComment = await Comment.findById(data.repliedTo);
  if (!parentComment) {
    throw new Error('Parent Comment not found');
  }
  if (!parentComment.chiefComment) {
    throw new Error(
      'Comment to whom this comment is replied to, not chief comment'
    );
  }

  const comment = await Comment.create({
    owner: user.id,
    // don't belongs to post, but a reply of a chiefComment
    belongsTo: null,
    repliedTo: data.repliedTo,
    // whenever we will create a reply comment, chiefComment will be false
    chiefComment: false,
    content: data.content,
  });

  // A LITTLE HACK: to populate owner in the comment that is created
  const commentWithOwner = await Comment.findById(comment.id).populate('owner');

  if (user) commentWithOwner!.populateWithCurrentUserProps(user);

  res.status(201).send({ comment: commentWithOwner });
});

export default handler;
