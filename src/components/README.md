# World Clock component

The branch `ziko-agent-quality-upgrade` now includes `src/components/WorldClock.jsx`, a responsive RTL world clock component with:

- live updates every second
- Cairo, Dubai, London, New York, Tokyo, and Sydney
- Arabic-localized time and date formatting via `Intl.DateTimeFormat`
- search by city, country, or IANA time zone
- favorites persisted in local storage
- accessible labels and live local-time announcements

Import it into any screen with:

```jsx
import WorldClock from './components/WorldClock';

<WorldClock />
```
