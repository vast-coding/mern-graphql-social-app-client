import { formatDistanceToNow } from 'date-fns'

// utc_example = '2021-02-20T06:12:11.813Z'

export const utcToDate = (utc) => {
  return formatDistanceToNow(new Date(utc))
}
