const toElapsedTime = (date: string): string => {
  const start = new Date(date)
  const end = new Date()
  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000)
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24

  if (seconds < 60) return '방금 전'
  else if (minutes < 60) return `${Math.floor(minutes)}분 전`
  else if (hours < 24) return `${Math.floor(hours)}시간 전`
  else if (days < 7) return `${Math.floor(days)}일 전`
  else return `${start.getFullYear()}년 ${start.getMonth() + 1}월 ${start.getDate()}일`
}

export { toElapsedTime }
