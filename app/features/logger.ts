import chalk from 'chalk'

/**
 * Creates a logger function with the specified name, foreground color and background color.
 *
 * @param {string} name - The prefix for the logger message.
 * @param {(m: any) => string} fg - The function to generate the foreground color for the logger message. Defaults to chalk.bgBlack.
 * @param {(m: any) => string} bg - The function to generate the background color for the logger message.
 * @returns {(message: any) => void} - The built logger function.
 */
const createLogger =
  (
    name: string,
    fg: (m: any) => string = chalk.bgBlack,
    bg: (m: any) => string
  ) =>
  (message: any) => {
    console.log(fg(bg(`${name}:`)), message)
  }

export default createLogger
