export function formatErrors(errors: Array<{ message: string }>): string {
  return JSON.stringify(errors)
}
