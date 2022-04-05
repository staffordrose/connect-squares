# [Connect Squares](https://connectsquares.staffordrose.com) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

Connect Squares is a single-player puzzle game inspired by the [Connect Me](https://play.google.com/store/apps/details?id=net.bohush.connect.me.logic.puzzle) game for Android. Connect Squares has three difficulty settings: Normal, Hard, and Expert. Each difficulty has 100 levels.

It is built in [TypeScript](https://www.typescriptlang.org/) with [Next.js](https://nextjs.org/), [Chakra](https://chakra-ui.com/), and [Framer Motion](https://www.framer.com/motion/).

## Dev

Run the app in development mode with:

```
yarn dev
```

## Build

Build for production with:

```
yarn build
```

## Start

Run the production build locally with:

```
yarn start
```

## Lint

Run the linter with:

```
yarn lint
```

## Generate Levels

Levels are generated using a local script and saved to the public directory. You can replace all 300 levels by running:

```
yarn generate-levels
```

## License

MIT © [Stafford Rose](https://github.com/staffordrose)
