import posthog from 'posthog-js'

console.log('POSTHOG FILE LOADED')

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
  debug: true,
})

posthog.capture('posthog_manual_test')
