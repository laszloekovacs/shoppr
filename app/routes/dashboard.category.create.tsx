import React from 'react'
import { useFetcher } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'

export const action = async (params: ActionFunctionArgs) => {
    const { request } = params
    const formData = await request.formData()
    const name = formData.get('name')

    // TODO: send it to the database

    return json({ name })
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
