import { useMutation2 as useMutation } from '../../hooks/use-mutation';
import { useFetch2 as useFetch } from '../../hooks/use-fetch';
import { useEffect, useState } from 'react';
import { usePaginatedFetch } from '../../hooks/use-paginated-fetch';

export function usePaginatedComments(props: {
  limit: number;
  defaultComments?: any[];
}) {
  const { limit, defaultComments } = props;
  const [hasMoreComments, setHasMoreComments] = useState(() =>
    defaultComments ? defaultComments.length >= limit : true
  );

  const {
    totalData,
    fetchMoreData,
    updateTotalData,
    dataFetchedPerPage: dataPerPage,
  } = usePaginatedFetch({
    defaultValue: {
      comments: (defaultComments ?? []) as any[],
    },
    valueKey: 'comments',
    url: '/api/comments',
    hasMoreData: hasMoreComments,
    lim: limit,
    furtherQueryParams: '&belongsTo=*',
  });

  useEffect(() => {
    if (dataPerPage.comments.length < limit) {
      // we ran out of comments inside of our db
      setHasMoreComments(false);
    }

    if (dataPerPage.comments.length >= limit) {
      setHasMoreComments(true);
    }
  }, [dataPerPage.comments.length, totalData.comments.length, limit]);

  const updateTotalComments = (fn: (prevComments: any[]) => any[]) => {
    updateTotalData(prev => ({ ...prev, comments: fn(prev.comments) }));
  };

  return {
    totalComments: totalData.comments,
    fetchMoreComments: fetchMoreData,
    hasMoreComments,
    updateTotalComments,
  };
}

const getCommentsDefaultValue = <T>() => ({
  comments: [] as T[],
});

export function useComments<T extends string>(belongsTo: T, limit?: number) {
  const { data, updateData, refetch } = useFetch({
    key: `comments/fetch/${belongsTo}`,
    defaultValue:
      getCommentsDefaultValue<typeof belongsTo extends any ? any : any>(),
    fetchOnMount: true,
    url: `/api/comments?belongsTo=${belongsTo}&limit=${limit}`,
    dontAddFromCacheBeforeFetching: true,
  });

  return {
    comments: data.comments,
    updateComments: updateData,
    refetchComments: refetch,
  };
}

const createDefaultValue = { comment: null } as { comment: any | null };

export function useCreateComment(props?: {
  onMutate?: (comment: any | null) => void;
}) {
  const mutation = useMutation({
    defaultValue: createDefaultValue,
    method: 'post',
    url: '/api/comments',
    onMutate: data => props && props.onMutate && props.onMutate(data.comment),
  });

  const { mutateData: create, mutating: creating, data } = mutation;

  return { createComment: create, creating, data };
}

export function useAddReply(props?: {
  onMutate?: (comment: any | null) => void;
}) {
  const mutation = useMutation({
    defaultValue: createDefaultValue,
    method: 'post',
    url: '/api/comments/add-reply',
    onMutate: data => props && props.onMutate && props.onMutate(data.comment),
  });

  const { mutateData: create, mutating: replying, data } = mutation;

  const createReply = (data: any) => {
    return create(data);
  };

  return { createReply, replying, data };
}

export function useEditComment(props?: {
  onMutate?: (comment: any | null) => void;
  commentId: string;
}) {
  const mutation = useMutation({
    defaultValue: createDefaultValue,
    method: 'patch',
    url: `/api/comments/${props && props.commentId}`,
    onMutate: data => props && props.onMutate && props.onMutate(data.comment),
  });

  const { mutateData: update, mutating: updating, data } = mutation;

  const updateComment = (data: string) => {
    return update({ content: data });
  };

  return { updateComment, updating, data };
}

type Message = 'User like added' | 'User like removed';

export function useLikeComment(props?: {
  onMutate?: (data: {
    likes: any['likes'];
    message: Message;
    likedByCurrentUser: any['likedByCurrentUser'];
  }) => void;
}) {
  const mutation = useMutation({
    defaultValue: null as null | {
      likes: any['likes'];
      message: Message;
      likedByCurrentUser: any['likedByCurrentUser'];
    },
    method: 'post',
    url: '/api/comments/update-like',
    onMutate: data => props && props.onMutate && props.onMutate(data!),
  });

  const { mutateData, mutating: liking, data } = mutation;

  const updateLike = (commentId: string) => {
    return mutateData({ commentId });
  };

  return { updateLike, liking, data };
}

export function useDeleteComment(props?: {
  onMutate?: (commentId: string) => void;
}) {
  const mutation = useMutation({
    defaultValue: null,
    method: 'delete',
  });

  const { mutateData, mutating: deleting, data } = mutation;

  const deleteComment = async (commentId: string) => {
    const url = `/api/comments/${commentId}`;
    await mutateData(null, url);
    props && props.onMutate && props.onMutate(commentId);
  };

  return { deleteComment, deleting, data };
}
