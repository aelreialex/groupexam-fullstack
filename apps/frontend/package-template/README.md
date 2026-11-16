# Package template

Copy this folder when creating a new frontend package.

## Before using

1. Rename the folder to the package name, using kebab-case.
2. Update `name` in `package.json`, for example `@app/button`.
3. Rename `ExampleComponent.tsx` to the component or module name, using PascalCase for React components.
4. Update the export in `index.ts`.
5. Remove files that are not relevant to the package.

The package's `index.ts` is its public entry point. Export only what other packages need to use.

For a package that does not contain a React component (for example a core utility), replace
`ExampleComponent.tsx` with suitable TypeScript files such as `cart.ts`, `types.ts` or `useCart.ts`.
