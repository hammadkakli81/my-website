import {
  DocumentType,
  type Ref,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  index,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

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
  bio?: string;
}

enum UserRole {
  user = 'user',
  admin = 'admin',
}
enum AuthProviders {
  // currently we are only using github
  github = 'github',
  google = 'google',
}
export type AuthProvidersUnion = `${AuthProviders}`;
export type UserRoleUnion = `${UserRole}`;
export type CustomDate = string | number | Date;

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.id = doc._id; // 'doc._id' is actually an instance of ObjectId, that will be converted to string automatically
        delete ret._id;
        delete ret.__v;
      },
    },
  },
})
@pre<UserClass>(new RegExp(/^find/), function (next) {
  this.sort({ createdAt: 'desc' });
  next();
})
class UserClass {
  @prop({
    required: true,
    trim: true,
    type: () => String,
  })
  name: string;

  @prop({
    trim: true,
    type: () => String,
  })
  bio: string;

  @prop({
    required: true,
    trim: true,
    type: () => String,
    unique: true,
  })
  email: string;

  @prop({
    trim: true,
    type: () => String,
    enum: UserRole,
    default: 'user',
  })
  role: UserRoleUnion;

  @prop({
    trim: true,
    type: () => String,
    enum: AuthProviders,
    default: 'google',
  })
  provider: AuthProvidersUnion;

  // this avatar is from github, not cloudinary, so not public_id
  @prop({
    trim: true,
    type: () => String,
  })
  avatar?: string;

  @prop({ type: () => Date })
  createdAt: CustomDate;

  @prop({ type: () => Date })
  updatedAt: CustomDate;
}

// bcs, when deleting the comment, we have to delete all the its replies
// wo we have to find the all replies (by its parent: repliedTo)
@index({ repliedTo: 'asc' })
@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      transform(doc, ret, options) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
  },
})
@pre<CommentClass>(new RegExp(/^find/), function (next) {
  this.sort({ createdAt: 'desc' });
  next();
})
class CommentClass {
  // the post to which the comments belongs to
  @prop({ default: null, ref: 'Blog' })
  belongsTo: Ref<any> | null;

  @prop({ required: true, ref: () => UserClass })
  owner: Ref<UserClass>;

  @prop({ required: true, type: () => String })
  content: string;

  @prop({
    required: true,
    ref: () => UserClass,
    default: [],
  })
  likes: Ref<UserClass>[];

  // VIRTUAL POPULATE (also for this, we have to call the populate method, and add 'virtuals: true' in toJSON(), and toObject())
  @prop({
    ref: () => CommentClass,
    foreignField: 'repliedTo',
    localField: '_id',
    default: [],
  })
  replies: Ref<CommentClass>[];

  // this comment can be a reply to other comment, to which comment this comment is replied to
  @prop({
    ref: () => CommentClass,
    default: null,
  })
  repliedTo: Ref<CommentClass> | null;

  @prop({ type: () => Boolean, default: true })
  chiefComment: boolean;

  @prop({ type: () => Boolean, default: false })
  ownedByCurrentUser: boolean;

  @prop({ type: () => Boolean, default: false })
  likedByCurrentUser: boolean;

  public populateWithCurrentUserProps(
    this: CommentDocument,
    user: IUser
  ): void {
    // 'owner' prop is populated, so we have to use the 'owner.id' prop
    const owner = this.owner?.id ? this.owner.id : this.owner.toString();

    this.ownedByCurrentUser = owner === user.id.toString();

    if (user.role === 'admin') {
      // if user is 'admin' allow access to the ownership also to owner, and the admin
      this.ownedByCurrentUser = true;
    }

    // likes are not populated, so we don't have to use 'like.id', we can just use, 'like' or 'like.toString()' both are same.
    this.likedByCurrentUser = !!this.likes.find(
      like => like.toString() === user.id.toString()
    );
  }
}

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'blogs' },
})
class BlogClass {
  @prop({
    required: true,
    trim: true,
    type: () => String,
  })
  title: string;
  @prop({
    type: () => String,
  })
  tags: string;

  @prop({
    required: true,
    unique: true,
    trim: true,
    type: () => String,
  })
  slug: string;

  @prop({
    required: true,
    trim: true,
    type: () => String,
  })
  meta: string;

  @prop({
    required: true,
    type: () => String,
  })
  content: string;

  @prop({
    type: () => Object,
  })
  thumbnail: { src: string; public_id: string };

  @prop({ required: true, ref: () => UserClass })
  author: Ref<UserClass>;
}

export const User = getModelForClass(UserClass);
export type UserDocument = DocumentType<UserClass>;

export const Comment = getModelForClass(CommentClass);
export type CommentDocument = DocumentType<CommentClass>;

export const Blog = getModelForClass(BlogClass);
export type BlogDocument = DocumentType<BlogClass>;
