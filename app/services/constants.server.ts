const DATABASE = process.env.DATABASE as string | ''

if (!DATABASE) {
	throw new Error('Missing DATABASE environment variable')
}

export { DATABASE }
