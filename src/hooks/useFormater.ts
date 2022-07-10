export const useFormater = () => {
  return function (date: Date | string): string {
    if (typeof date === 'string') {
      const m = new Date(date).getMonth() + 1
      const d = new Date(date).getDate()

      return `${new Date(date).getFullYear()}-${m >= 10 ? m : '0' + m}-${
        d >= 10 ? d : '0' + d
      }`
    } else if (date instanceof Date) {
      const m = date.getMonth() + 1
      const d = date.getDate()

      return `${date.getFullYear()}-${m >= 10 ? m : '0' + m}-${
        d >= 10 ? d : '0' + d
      }`
    }

    return 'error'
  }
}
