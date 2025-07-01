export function log(message: string): void {
  console.log(`[LOG] ${message}`)
}

export function formatDate(date: Date, format: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function flipCoin(): 'heads' | 'tails' {
  if (Math.random() > 0.5) return 'heads'
  return 'tails'
}
