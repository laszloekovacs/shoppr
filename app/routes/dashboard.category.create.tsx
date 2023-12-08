import React from 'react'
import { useFetcher } from '@remix-run/react'

const CreateCategoryPage = () => {
    const fetcher = useFetcher()

    return (
        <div>
            <h2>Create Category</h2>
            <fetcher.Form method="POST">
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </fetcher.Form>
        </div>
    )
}

export default CreateCategoryPage
