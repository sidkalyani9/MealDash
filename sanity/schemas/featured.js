import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Featured Category name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
        name: 'restaurants',
        title: 'Restaurants',
        type: 'array',
        of: [{ type: "reference", 
            to: [{ type: "restaurant" }] }],
      }),
  ],
})