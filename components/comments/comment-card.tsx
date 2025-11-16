import { PropsWithChildren, type FC, useState } from 'react';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import {
  BsBoxArrowUpRight,
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from 'react-icons/bs';

export interface IUser {
  // this is for frontend
  id: string | mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: UserRoleUnion;
  avatar?: string;
  provider?: AuthProvidersUnion;
  createdAt: CustomDate;
  updatedAt: CustomDate;
}

export interface IImage {
  url: string;
  public_id: string;
}

export interface IAuthorInfo {
  id: string;
  name: string;
  avatar?: string;
}

export interface IPost {
  // this is for frontend
  id: string;
  title: string;
  content: string;
  meta: string;
  slug: string;
  tags: string[];
  thumbnail?: IImage;
  author: string | IAuthorInfo;
  createdAt: CustomDate;
  updatedAt: CustomDate;
}

export interface ICustomError {
  message: string;
  field?: string;
}

type ICommentUser = Pick<IUser, 'name' | 'role' | 'avatar' | 'id' | 'email'>;

export interface IComment {
  id: string;
  likedByCurrentUser: boolean;
  ownedByCurrentUser: boolean;
  belongsTo: string | null | { title: string; slug: string };
  owner: ICommentUser;
  content: string;
  likes: string[]; // technically an ObjectId strings array
  repliedTo: string | null;
  chiefComment: boolean;
  replies: IComment[];
  createdAt: CustomDate;
  updatedAt: CustomDate;
  new?: boolean;
}

export type FinalReply = { content: string; repliedTo: string };

import { ProfileIcon } from './profile-icon';
import { CommentForm } from './comment-form';

import { LikeHeart } from './like-heart';
import Link from 'next/link';
import mongoose from 'mongoose';
import {
  AuthProvidersUnion,
  CustomDate,
  UserRoleUnion,
} from '../../models/comment';
import {
  useDeleteComment,
  useEditComment,
  useLikeComment,
} from './comment-hooks';
import { useSession } from 'next-auth/react';

export function trimText(text: string, trimBy: number): string {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + '...';
}

export function useUser() {
  const { data, status } = useSession();
  return { user: data?.user, status };
}

type Props = {
  comment: IComment;
  isRepliesShown?: boolean;
  placeholder?: string;
  refetchComments?: () => void;
  createReply?: (reply: FinalReply) => Promise<any>;
  onDelete: (commentId: string, repliedTo?: string | null) => void;
  showWhichReplies?: (commentId: string) => void;
  busy?: boolean;
  whichCommentBusyOnReplying?: (commentId: string | null) => void;
};

const CommentCard: FC<Props> = ({
  comment,
  placeholder,
  refetchComments,
  createReply,
  onDelete,
  showWhichReplies,
  whichCommentBusyOnReplying,
  busy,
  isRepliesShown,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formBtnTitle, setFormBtnTitle] = useState('Submit');

  const [initialState, setInitialState] = useState('');
  const [content, setContent] = useState(comment.content);
  const [likes, setLikes] = useState(comment.likes);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    comment.likedByCurrentUser
  );

  const { user } = useUser();
  const isAdmin = user?.role === 'admin';

  const { updateComment, updating } = useEditComment({
    commentId: comment.id,
    onMutate: comment => {
      setContent(comment!.content);
      refetchComments && refetchComments();
      hideForm();
    },
  });

  const { deleteComment, deleting } = useDeleteComment({
    onMutate: commentId => {
      onDelete(commentId, comment.repliedTo);
      refetchComments && refetchComments();
    },
  });

  const { updateLike, liking } = useLikeComment({
    onMutate: data => {
      setLikes(data.likes);
      setLikedByCurrentUser(data.likedByCurrentUser);
      refetchComments && refetchComments();
    },
  });

  const displayForm = () => setShowForm(true);
  const hideForm = () => {
    setShowForm(false);
    // Reset to default
    setFormBtnTitle('Submit');
  };

  const handleOnReplyClick = () => {
    setFormBtnTitle('Add Reply');
    // resetting to default
    setInitialState('');
    displayForm();
  };

  const handleOnEditClick = () => {
    setFormBtnTitle('Edit');
    setInitialState(content);
    displayForm();
  };

  const handleOnSubmit = async (content: string) => {
    if (!initialState) {
      // handle reply
      whichCommentBusyOnReplying && whichCommentBusyOnReplying(comment.id);

      const reply: FinalReply = { content, repliedTo: comment.id };

      await (createReply && createReply(reply));

      whichCommentBusyOnReplying && whichCommentBusyOnReplying(null);

      return hideForm();
    }
    // handle edit
    updateComment(content);
  };

  const onLikeClick = () => {
    if (!user || !user.id) return;
    updateLike(comment.id);
  };

  return (
    <div className="flex items-start space-x-3">
      <ProfileIcon
        nameInitial={
          comment.owner.avatar ? undefined : comment.owner.name[0].toUpperCase()
        }
        avatar={comment.owner.avatar}
      />

      <div className="flex-1">
        <h1 className="text-lg font-semibold text-gray-800">
          {comment.owner.name}
          <span className="text-gray-600">
            {isAdmin && ` - ${comment.owner.email}`}{' '}
            {comment.owner.role === 'admin' && (
              <span className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-2 py-1 text-white text-sm ml-2">
                Admin
              </span>
            )}
          </span>
        </h1>

        {comment.belongsTo !== null &&
          typeof comment.belongsTo !== 'string' && (
            <div className="flex items-center font-semibold text-gray-700 transition">
              <span className="text-sm text-gray-600">
                commented on -
              </span>

              <Link
                className="ml-2 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                href={`/${comment.belongsTo.slug}`}
                target="_blank"
              >
                <BsBoxArrowUpRight size={12} />
                <p className="inline-block">
                  {trimText(comment.belongsTo.title, 30)}
                </p>
              </Link>
            </div>
          )}

        <span className="text-sm text-gray-600">
          {dateFormat(comment.createdAt, 'd-mmm-yyyy')}
        </span>
        <div className="prose prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-a:text-blue-600">{parse(content)}</div>

        <div className="flex items-center space-x-4 flex-wrap gap-2 mt-3">
          <LikeHeart
            liked={likedByCurrentUser}
            label={likes.length + ' likes'}
            onClick={onLikeClick}
            busy={liking}
          />
          {comment.chiefComment && (
            <CCButton
              onClick={() => showWhichReplies && showWhichReplies(comment.id)}
            >
              <span className="underline">
                {isRepliesShown ? 'Hide' : 'Show'} Replies
              </span>
            </CCButton>
          )}

          {!!user && !!createReply && comment.chiefComment && (
            <CCButton onClick={handleOnReplyClick}>
              <BsFillReplyAllFill />
              <span>Reply</span>
            </CCButton>
          )}

          {comment.ownedByCurrentUser && (
            <>
              <CCButton onClick={handleOnEditClick}>
                <BsPencilSquare />
                <span>Edit</span>
              </CCButton>

              <CCButton
                busy={deleting}
                onClick={() => deleteComment(comment.id)}
              >
                <BsFillTrashFill />
                <span>{deleting ? 'Deleting...' : 'Delete'}</span>
              </CCButton>
            </>
          )}
        </div>

        {showForm && (
          <div className="mt-3 bg-white/50 backdrop-blur-md rounded-xl p-4 border border-blue-200/30">
            <CommentForm
              btnTitle={formBtnTitle}
              onClose={hideForm}
              onSubmit={handleOnSubmit}
              initialState={initialState}
              busy={busy || updating}
              placeholder={placeholder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const CCButton: FC<
  PropsWithChildren<{ onClick?: () => void; busy?: boolean }>
> = ({ children, onClick, busy = false }) => {
  return (
    <button
      disabled={busy}
      onClick={onClick}
      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export { CommentCard };
