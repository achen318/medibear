import { defineSchema, defineTable } from 'convex/server';

import { v } from 'convex/values';

export default defineSchema(
  {
    user: defineTable({
      name: v.string(),
      email: v.string(),
      username: v.string(),
      password: v.string()
    }),

    consult: defineTable({
      patient: v.id('patient'),
      body: v.id('message'),
      resolved: v.boolean(),
      title: v.string()
    }),

    message: defineTable({
      author: v.string(),
      images: v.array(v.string()),
      text: v.string(),
      replies: v.array(v.id('message'))
    }),

    patient: defineTable({
      allergies: v.optional(v.string()),
      blood_type: v.optional(v.string()),
      conditions: v.optional(v.string()),
      consults: v.array(v.id('consult')),
      sex: v.optional(v.string())
    }),

    doctor: defineTable({
      title: v.string(),
      specialty: v.optional(v.string()),
      consults: v.array(v.id('consult'))
    })
  },
  { schemaValidation: true }
);
