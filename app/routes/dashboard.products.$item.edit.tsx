import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData, useActionData } from '@remix-run/react'
import { ProductSchema } from '~/model/product'
import { db } from '~/services/db.server'
import invariant from 'tiny-invariant'

// find the product by name in the database
export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.item, 'params.item is required')

	const item = await db.products.findOne<ProductSchema & { _id: string }>({
		name: params.item
	})
	if (item) {
		return json({ item })
	}

	throw new Error('failed to fetch item')
}

export default function ProductDetailsPage() {
	const { item } = useLoaderData<typeof loader>()
	const fetcher = useFetcher()
	const actionData = useActionData<typeof action>()

	return (
		<div>
			<div>
				<p>{item.name}</p>
				<p>gyártó: {item.brand}</p>
				<p>termékcsoport: {item.department}</p>
			</div>

			<p>
				<span>adatbázis index: </span>
				<span>{item._id}</span>
			</p>
			<hr />

			<fetcher.Form method='post'>
				<input type='hidden' name='name' value={item.name} />
				<>
					<label htmlFor='department'>Kategória</label>
					<input type='text' name='department' defaultValue={item.department} />

					<button type='submit' name='intent' value='SET_DEPARTMENT'>
						Rögzít
					</button>
				</>
				<br />
				<>
					<label htmlFor='brand'>Gyártó</label>
					<input type='text' name='brand' defaultValue={item.brand} />
					<button type='submit' name='intent' value='SET_BRAND'>
						Rögzít
					</button>
				</>
			</fetcher.Form>
			<hr />

			<h2>Termék attribútumok</h2>
			<fetcher.Form method='post'>
				<input type='hidden' name='name' value={item.name} />
				<>
					<label htmlFor='attribute'>kulcs</label>
					<input type='text' name='attribute' />
				</>
				<>
					<label htmlFor='attributeValue'>érték</label>
					<input type='text' name='attributeValue' />
				</>

				<button type='submit' name='intent' value='ADD_ATTRIBUTE'>
					Hozzáad
				</button>
			</fetcher.Form>

			{/* list of existing attributes */}
			<div>
				<ul>
					{item.attributes &&
						Object.entries(item.attributes).map(([key, value]) => (
							<li key={key}>
								<div>
									{key}: {value}
								</div>
								<div>
									<fetcher.Form method='post'>
										<input type='hidden' name='name' value={item.name} />
										<input type='hidden' name='attribute' value={key} />

										<button
											type='submit'
											name='intent'
											value='DELETE_ATTRIBUTE'>
											töröl
										</button>
									</fetcher.Form>
								</div>
							</li>
						))}
				</ul>
			</div>

			{/* variants */}
			<div>
				<p>Változatok</p>
				<fetcher.Form method='post'>
					<input type='hidden' name='name' value={item.name} />

					<label htmlFor='variant'>Változat neve</label>
					<input type='text' name='variant' />
					<label htmlFor='price'>Változat ára</label>
					<input type='number' name='price' />

					<button type='submit' name='intent' value='ADD_VARIANT'>
						Változat hozzáadása
					</button>
				</fetcher.Form>

				{/* list of existing variants */}
				<div>
					<ul>
						{item.variants &&
							item.variants.map(({ kind, price }) => (
								<li key={kind}>
									{kind}: {price.toString()}
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const body = await request.formData()

	const name = body.get('name')?.toString()
	const intent = body.get('intent')?.toString()

	// TODO: validate and sanitize input

	switch (intent) {
		case 'SET_DEPARTMENT': {
			const department = body.get('department')?.toString()
			await db.products.updateOne({ name }, { $set: { department } })

			break
		}

		case 'SET_BRAND': {
			const brand = body.get('brand')?.toString()
			await db.products.updateOne({ name }, { $set: { brand } })

			break
		}

		case 'ADD_ATTRIBUTE': {
			const attribute = body.get('attribute')?.toString()
			const attributeValue = body.get('attributeValue')?.toString()

			await db.products.updateOne(
				{ name },
				{
					$set: {
						[`attributes.${attribute}`]: attributeValue
					}
				}
			)

			break
		}

		case 'DELETE_ATTRIBUTE': {
			const attribute = body.get('attribute')?.toString()

			const result = await db.products.updateOne(
				{ name },
				{
					$unset: {
						[`attributes.${attribute}`]: ''
					}
				}
			)

			return result.modifiedCount == 1
				? json({ status: 'ok' })
				: json({ status: `failed to delete attribute: ${attribute}` })
		}

		case 'ADD_VARIANT': {
			const variant = body.get('variant')?.toString()
			const price = body.get('price')?.toString()

			const result = await db.products.updateOne(
				{ name },
				{
					$addToSet: {
						variants: {
							kind: variant,
							price: Number(price)
						}
					}
				}
			)

			return result.modifiedCount == 1
				? json({ status: 'ok' })
				: json({ status: `failed to add variant: ${variant}` })
		}

		default:
			throw new Error(`invalid intent ${intent}`)
	}

	return json({ status: 'should not happen, but ok' })
}
