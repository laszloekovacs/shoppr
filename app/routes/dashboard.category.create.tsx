import React from 'react'
import { useFetcher } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { createCategory } from '../mongo/resolvers'

export const action = async (params: ActionFunctionArgs) => {
    const { request } = params
    const formData = await request.formData()
    const name = formData.get('name')?.toString()

    if (!name) {
        throw new Error('Name is required')
    }

    const category = await createCategory(name)

    return json({ category })
}

export const loader = async (params: LoaderFunctionArgs) => {
    return json({})
}

const CreateCategoryPage = () => {
    const fetcher = useFetcher()

    return (
        <div>
            <h2>Create Category</h2>
            <fetcher.Form method="POST">
                <input type="text" name="name" />
                <input type="submit" value="Submit" role="submit" />
            </fetcher.Form>
        </div>
    )
}

export default CreateCategoryPage
