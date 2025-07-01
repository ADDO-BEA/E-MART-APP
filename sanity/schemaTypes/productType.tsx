import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'discount',
            title: 'Discount',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
            initialValue: 0,
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'colors',
            title: 'Available Colors',
            type: 'array',
            of: [
                defineField({
                    name: 'color',
                    type: 'object',
                    fields: [
                        {
                            name: 'label',
                            title: 'Color Label',
                            type: 'string',
                        },
                        {
                            name: 'hex',
                            title: 'Hex Code',
                            type: 'string',
                            validation: (Rule) =>
                                Rule.regex(/^#[0-9A-Fa-f]{6}$/, 'hex color').error('Must be a valid hex color code (e.g., #FF5733)'),
                        },
                    ],
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            subtitle: 'price',
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: `$${selection.subtitle}`,
                media: selection.media,
            };
        },
    },
});
