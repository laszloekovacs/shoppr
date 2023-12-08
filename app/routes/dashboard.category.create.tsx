import React from 'react'
import { useFetcher, useLoaderData } from '@remix-run/react'
import {
    ActionFunctionArgs,
    LoaderFunction,
    LoaderFunctionArgs,
    json,
} from '@remix-run/node'
import db from '../mongo'
import { CategoryDocument, CategoryModel } from '../mongo/schema'

export const action = async (params: ActionFunctionArgs) => {
    const { request } = params
    const formData = await request.formData()
    const name = formData.get('name')?.toString()

    if (!name) {
        throw new Error('Name is required')
    }

    /* create a new category in db */
    const category = await db.category.create(name)

    return json({ category })
}

export const loader = async (params: LoaderFunctionArgs) => {
    const categories = await (
        await CategoryModel.find<CategoryDocument>({})
    ).map((category) => {
        return {
            _id: category._id,
            name: category.name,
        }
    })

    if (!categories) {
        throw new Error('No categories found')
    }

    return json({ categories })
}

const CreateCategoryPage = () => {
    const fetcher = useFetcher<typeof loader>()
    const { categories } = useLoaderData<typeof loader>()

    return (
        <div>
            <h2>Create Category</h2>
            <fetcher.Form method="POST">
                <input type="text" name="name" />
                <input type="submit" value="Submit" role="submit" />
            </fetcher.Form>
            <p>test</p>
            {categories ? (
                <ul>
                    {categories.map((category) => (
                        <li key={category._id}>{category.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No categories found, add some!</p>
            )}
        </div>
    )
}

export default CreateCategoryPage
