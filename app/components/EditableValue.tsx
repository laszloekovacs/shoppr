import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'

const EditableValue = ({
	name,
	initialValue,
}: {
	name: string
	initialValue: string | number
}) => {
	const [isEditing, setEditing] = useState(false)
	const [value, setValue] = useState(initialValue)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClick = (e: any) => {
		setEditing((state) => !state)
	}

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
	}, [isEditing])

	return (
		<div style={{ backgroundColor: 'orangered' }}>
			{isEditing ? (
				<>
					<input
						ref={inputRef}
						type={typeof value == 'string' ? 'text' : 'number'}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<input type="button" value="done" />
				</>
			) : (
				<div onClick={handleClick}>{value}</div>
			)}
		</div>
	)
}

export default EditableValue
