import { useState, type FC, useEffect } from 'react';
import { CommentForm } from './comment-form';

import { CommentCard, useUser } from './comment-card';
import classNames from 'classnames';
import { useAddReply, useComments, useCreateComment } from './comment-hooks';
import { GoogleAuthButton } from '../google-button';

export type FinalComment = {
  content: string;
  belongsTo?: string;
};

type Props = { postId: string };

const Comments: FC<Props> = ({ postId }) => {
  const [showReplies, setShowReplies] = useState([] as string[]);
  const [whichCommentBusy, setWhichCommentBusy] = useState(
    null as null | string
  );

  const { user } = useUser();
  const { comments, refetchComments, updateComments } = useComments(postId);

  const { createComment, creating } = useCreateComment({
    onMutate: comment => {
      // first optimistic update the comments
      updateComments(prev => ({
        comments: [{ ...comment!, new: true }, ...prev.comments],
      }));

      // then refetch the comments
      refetchComments();
    },
  });

  const { createReply } = useAddReply({
    onMutate: comment => {
      if (!comment) return;

      if (comment.repliedTo) {
        const repliedTo = comment.repliedTo;
        setShowReplies(prev => [...prev, repliedTo]);
      }

      updateComments(prev => {
        const newComments = [...prev.comments];
        const chiefComment = prev.comments.find(({ id }) => {
          return id === comment?.repliedTo;
        });
        if (!chiefComment) return prev;
        chiefComment.replies = [
          { ...comment, new: true },
          ...chiefComment.replies,
        ];
        return { comments: newComments };
      });

      refetchComments && refetchComments();
    },
  });

  const handleNewCommentSubmit = (content: string) => {
    if (!user || !user.id) return;
    const comment: FinalComment = { content, belongsTo: postId };

    createComment(comment);
  };

  // this will work for both replies and comments
  const onDeleteComment = (commentId: string, repliedTo?: string | null) => {
    if (!repliedTo) {
      return updateComments(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c.id !== commentId),
      }));
    }

    updateComments(prev => {
      const newComments = [...prev.comments];
      const chiefComment = prev.comments.find(({ id }) => {
        return id === repliedTo;
      });
      if (!chiefComment) return prev;
      chiefComment.replies = chiefComment.replies.filter(
        (r: any) => r.id !== commentId
      );
      return { comments: newComments };
    });
  };

  return (
    <div className="space-y-8 py-20">
      {user ? (
        <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-2xl p-6 shadow-lg">
          <CommentForm
            onSubmit={handleNewCommentSubmit}
            busy={creating}
            title="Add comment"
          />
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-2xl p-6 shadow-lg flex flex-col items-end space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Log in to add your comment
          </h3>
          <GoogleAuthButton />
        </div>
      )}

      {comments.length ? (
        <>
          {comments.map(comment => (
            <div
              className={classNames(
                'rounded-2xl border border-blue-200/30 p-6 bg-white/70 backdrop-blur-xl shadow-lg',
                comment.new ? 'bg-blue-50/70 border-blue-300/50' : ''
              )}
              key={comment.id}
            >
              <CommentCard
                placeholder="Add your reply..."
                refetchComments={refetchComments}
                comment={comment}
                createReply={createReply}
                onDelete={onDeleteComment}
                showWhichReplies={id =>
                  setShowReplies(prev =>
                    !prev.includes(id)
                      ? [...prev, id]
                      : prev.filter(p => p !== id)
                  )
                }
                isRepliesShown={showReplies.includes(comment.id)}
                busy={whichCommentBusy === comment.id}
                whichCommentBusyOnReplying={id => setWhichCommentBusy(id)}
              />

              {showReplies.includes(comment.id) && (
                <div className="ml-auto mt-3 w-[95%] space-y-3">
                  {comment.replies.length ? (
                    <>
                      <h3 className="mb-3 font-semibold text-gray-800 underline">
                        Replies
                      </h3>
                      {comment.replies.map((reply: any) => (
                        <div
                          className={classNames(
                            'rounded-2xl border border-blue-200/30 p-4 bg-white/60 backdrop-blur-md',
                            reply.new ? 'bg-blue-50/60 border-blue-300/50' : ''
                          )}
                          key={reply.id}
                        >
                          <CommentCard
                            refetchComments={refetchComments}
                            comment={reply}
                            onDelete={onDeleteComment}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <h3 className="mb-3 inline-block rounded-xl bg-blue-50/70 border border-blue-200/30 px-4 py-2 font-semibold text-gray-700">
                      There are no replies to this comment.
                    </h3>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <h3 className="mb-3 inline-block rounded-xl bg-white/70 backdrop-blur-xl border border-blue-200/30 px-4 py-2 text-2xl font-semibold text-gray-800 shadow-lg">
          There are no comments to this post
        </h3>
      )}
    </div>
  );
};

export { Comments };
