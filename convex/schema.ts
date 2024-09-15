import { defineSchema, defineTable } from 'convex/server';

import { v } from 'convex/values';

export default defineSchema(
  {
    user: defineTable({
      name: v.string(),
      email: v.string(),
      username: v.string(),
      password: v.string(),
      onboarded: v.boolean()
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
      sex: v.string(),
      blood_type: v.string(),
      allergies: v.string(),
      conditions: v.string(),
      consults: v.array(v.id('consult'))
    }),

    practitioner: defineTable({
      title: v.string(),
      specialty: v.string(),
      npi: v.number(),
      consults: v.array(v.id('consult'))
    })
  },
  { schemaValidation: true }
);
