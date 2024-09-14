import { mutation, query } from './_generated/server';

import { v } from 'convex/values';

export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query('message').collect();
  }
});

export const createMessage = mutation({
  args: {
    author: v.string(),
    images: v.array(v.string()),
    text: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('message', {
      author: args.author,
      images: args.images,
      text: args.text
    });
  }
});

export const deleteMessage = mutation({
  args: {
    messageId: v.id('message'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId);
  },
});


