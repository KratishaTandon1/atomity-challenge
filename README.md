# Atomity — Frontend Engineering Challenge

## Chosen Feature

I chose **Option A**. The dashboard layout consisting of an interactive bar chart and an underlying data table tracking cloud resource usage. I selected this because the "drill-down" interaction flow — transitioning seamlessly from Cluster -> Namespace -> Pod levels while regenerating the data visualization — presented an excellent opportunity to showcase layout transitions and fluid UI choreography.

## Approach to Animation

My goal was to create UI motion that feels physically natural and engaging, without becoming overwhelming. I built this using **Framer Motion**:
- **Drill-down transition:** Utilizing the `layoutId` property on the `motion.div` representing the chart bars, giving them a spring-based scale and height adjustment without breaking the DOM hierarchy when the level shifts.
- **Staggered Entrance:** The Resource Tiles (CPU, RAM, Storage, etc.) feature an entrance transition using `scale` and `opacity` with a staggered `delay` factor, ensuring they organically cascade onto the screen.
- **Micro-interactions:** Interactive components (chart bars, table rows, and action buttons) respond accurately with scale suppression (`whileTap`) to provide instantaneous tactile feedback.

## Token and Style Structure

Instead of scattering hex values, I enforced a strict design-token architecture adhering to the requirements.
- **`globals.css`** defines all functional utility variables under `:root`, such as `var(--color-text-primary)` and `var(--radius-card)`.
- **Modern CSS Integration:** The layout utilizes modern CSS capabilities such as `clamp()` for fluid typography (making the main header scalable across viewport boundaries without rigid media breakpoint definitions) and `@container` contextual queries through Tailwind to conditionally restructure the dashboard card's header specifically based on the **component's** available width rather than the screen size.

## Data Fetching and Caching

- I utilized **TanStack React Query** (`useQuery`) paired with the native `fetch` Web API to request data from `https://jsonplaceholder.typicode.com`. 
- The raw payload is deterministically transformed using a custom utility to output the hierarchal resource shapes required by the Option A prototype (CPU, RAM, Network usage converted to synthetic Cloud metric footprints).
- The `staleTime` is set strictly, preventing any redundant fetches when navigating back to a previous level or forcing a component re-render. A custom animated loading spinner handles the initial async wait state gracefully.

## Libraries Used
- **Next.js & React 19:** Utilizing the App Router for foundational architecture.
- **Tailwind CSS v4:** Providing rapid utility-class compilation against custom CSS variable tokens.
- **Framer Motion:** Powering the physics-based spring animations and shared layout ID transitions.
- **@tanstack/react-query:** Providing professional-grade data caching.

## Tradeoffs and Decisions

- **Iconography:** I bypassed adding external icon libraries (like Lucide or Heroicons) to adhere maximally to the constraint of building all UI elements independently. The SVG icons used for the Resource Tiles are written as bespoke React SVGs component definitions.
- **Data Hydration vs Payload size:** Rather than implementing infinite scrolling or excessive querying, the metrics hook maps precisely what is needed for the 3 hierarchy levels visible in the video reference.

## What I Would Improve With More Time

1. **Accessibility (a11y):** Further robust testing with VoiceOver and keyboard iteration ensuring complete keyboard navigation compatibility inside the interactive charts.
2. **Dark Mode Architecture:** Build out semantic `[data-theme='dark']` token overrides within `globals.css` that sync to a `useTheme` toggle for deeper token structure showcasing.
3. **Data Tooltips:** Implement hovering tooltips above the bar chart leveraging Radix Primitives or Floating UI to convey exact values explicitly without requiring the user to look back down at the table.
