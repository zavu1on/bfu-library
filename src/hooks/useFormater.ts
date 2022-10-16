export const useFormater = () => {
  return function (date: Date | string | undefined): string | undefined {
    if (typeof date === 'string' || typeof date === 'undefined') {
      return date
    }

    let m = date.getMonth()
    let year = date.getFullYear()
    const d = date.getDate()

    if (m === 0) {
      m = 12
      year -= 1
    }

    return `${year}-${m >= 10 ? m : '0' + m}-${d >= 10 ? d : '0' + d}`
  }
}
