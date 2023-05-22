import { NextRouter } from 'next/router'

export const replaceWithQueryBuilder = (
  router: NextRouter,
  url: {
    query: string,
    value: boolean | number | undefined
  },
) => {
  const mapped = new Map<string, boolean | number>()

  Object.keys(router.query).forEach((key) => mapped.set(key, router.query[key] as any))

  let newUrl = ''

  if (mapped.size === 0) {
    newUrl = `/?${url.query}=${url.value}`
  } else if (url.value === undefined) {
    mapped.delete(url.query)

    const entries = []

    mapped.forEach((value, key) => {
      entries.push([key, value])
    })

    const currentUrl = entries.map(([key, value]) => `${key}=${value}`).join('&')

    newUrl = currentUrl.length === 0 ? '' : `/?${currentUrl}`
  } else {
    const hasKey = mapped.has(url.query)

    if (hasKey) {
      mapped.set(url.query, url.value)
    }

    const entries = []

    mapped.forEach((value, key) => {
      entries.push([key, value])
    })

    const currentUrl = entries.map(([key, value]) => `${key}=${value}`).join('&')

    newUrl = hasKey ? `/?${currentUrl}` : `/?${currentUrl}&${url.query}=${url.value}`
  }

  router.replace(newUrl, undefined, { shallow: true })
}
