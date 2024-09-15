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
    text: v.string(),
    replies: v.optional(v.array(v.id('message')))
  },
  handler: async (ctx, args) => {
    const newMessage = {
      author: args.author,
      images: args.images,
      text: args.text,
      replies: args.replies || [] // creates an empty array otherwise
    };

    await ctx.db.insert('message', newMessage);
    return newMessage;
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

export const createConsult = mutation({
  args: {
    patient: v.id("patient"),
    body: v.id('message'),
    resolved: v.boolean(),
    title: v.string()
  },
  handler: async (ctx, args) => {
    const newConsult = {
      patient: args.patient,
      body: args.body, 
      resolved: args.resolved,
      title: args.title
    };

    await ctx.db.insert('consult', newConsult);

    return newConsult;
  }
})

export const reply = mutation({
  args: {
    OPId: v.id('message'),
    replyId: v.id('message')
  },
  handler: async (ctx, args) => {

    const originalMessage = await ctx.db.get(args.OPId);
    
    if (!originalMessage){
      throw new Error('Message not found');
    }
    const updatedReplies = [...(originalMessage.replies || []), args.replyId];

    await ctx.db.patch(args.OPId, {
      replies: updatedReplies
    });

    return updatedReplies;
  }
})

export const createPatient = mutation({
  args: {
    allergies: v.array(v.string()),
    blood_type: v.optional(v.string()),
    conditions: v.array(v.string()),
    consults: v.array(v.id('consult')),
    sex: v.optional(v.string())
  }, 
  handler: async (ctx, args) => {
    const newPatient = {
      allergies: args.allergies,
      blood_type: args.blood_type,
      conditions: args.conditions,
      consults: args.consults,
      sex: args.sex
    }

    await ctx.db.insert('patient', newPatient);

    return newPatient;
  }
})



