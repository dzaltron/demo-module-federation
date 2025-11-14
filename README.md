# Module Federation Demo with Turborepo

This is a demonstration project that uses **Turborepo**, **Module Federation**, and **React Router DOM** with the **Bridge** pattern to create a micro-frontend architecture.

## 🏗️ Project Structure

```
demo-module-federation/
├── packages/
│   ├── consumer/          # Host application (port 3000)
│   ├── provider-a/        # Remote application A (port 3001)
│   ├── provider-b/        # Remote application B (port 3002)
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── eslint-config/     # Shared ESLint configurations
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 🚀 Technologies Used

- **Turborepo**: High-performance build system for monorepos
- **Module Federation**: Enables code sharing between applications at runtime
- **React Router v7**: Declarative routing for React
- **@module-federation/bridge-react**: Bridge pattern for seamless integration between applications
- **Rsbuild**: Modern and performant build tool
- **TypeScript**: Static typing
- **pnpm**: Efficient package manager

## 📋 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.15.0

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo-module-federation
```

2. Install dependencies:
```bash
pnpm install
```

## 🎯 How to Run

### Development

To start all applications in development mode:

```bash
pnpm dev
```

This will start:
- **Consumer** at http://localhost:3000
- **Provider A** at http://localhost:3001
- **Provider B** at http://localhost:3002

### Run applications individually

```bash
# Consumer (host)
cd packages/consumer
pnpm dev

# Provider A
cd packages/provider-a
pnpm dev

# Provider B
cd packages/provider-b
pnpm dev
```

### Build

To build all applications:

```bash
pnpm build
```

### Lint

To run linting on all packages:

```bash
pnpm lint
```

### Clean

To clean build artifacts:

```bash
pnpm clean
```

## 🎨 Features

### Consumer (Host Application)
- Main application that consumes remote modules
- Navigation between different providers via React Router
- Lazy loading of remote modules with error boundaries
- Dynamic remote registration using `registerRemotes()`
- Routes:
  - `/` - Home with navigation to providers
  - `/provider-a/*` - Provider A routes
  - `/provider-b/*` - Provider B routes

### Provider A
- Remote module exposed via Module Federation
- Internal routes with React Router:
  - `/` - Home page with links to details and Provider B
  - `/details` - Details page with back navigation
- Bridge router enabled for seamless navigation

### Provider B
- Remote module exposed via Module Federation
- Internal routes with React Router:
  - `/` - Home page with links to details and Provider A
  - `/details` - Details page with back navigation
- Bridge router enabled for seamless navigation

## 🔌 Module Federation Architecture

### Consumer (rsbuild.config.ts)
```typescript
pluginModuleFederation({
  name: 'consumer',
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
})
```

### Consumer Runtime (App.tsx)
```typescript
import { registerRemotes, loadRemote } from '@module-federation/enhanced/runtime';

// Register remotes dynamically
registerRemotes([
  {
    name: 'providerA',
    entry: 'http://localhost:3001/mf-manifest.json',
  },
  {
    name: 'providerB',
    entry: 'http://localhost:3002/mf-manifest.json',
  },
]);

const ProviderA = createRemoteAppComponent({
  loader: () => loadRemote('providerA/app'),
  loading: <div>Loading Provider A...</div>,
  fallback: ({ error }) => <div>Error: {error?.message}</div>,
});
```

### Providers (rsbuild.config.ts)
```typescript
pluginModuleFederation({
  name: 'providerA', // or 'providerB'
  exposes: {
    './app': './src/export-app.tsx',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
  bridge: {
    enableBridgeRouter: true,
  },
})
```

Note: The `dts: false` option may be present in provider configurations to disable TypeScript declaration generation.

## 🌉 Bridge Pattern

The Bridge Pattern is used for seamless integration between applications:

```typescript
// Provider - export-app.tsx
import { createBridgeComponent } from '@module-federation/bridge-react';
import App from './App';

export default createBridgeComponent({
  rootComponent: App,
});

// Consumer - App.tsx
import { createRemoteAppComponent } from '@module-federation/bridge-react';
import { loadRemote } from '@module-federation/enhanced/runtime';

const ProviderA = createRemoteAppComponent({
  loader: () => loadRemote('providerA/app'),
  loading: <div>Loading...</div>,
  fallback: ({ error }) => <div>Error: {error?.message}</div>,
});
```

## 📦 Shared Dependencies

Shared dependencies between applications include:
- **react**: Singleton with eager loading to ensure a single instance across all applications
- **react-dom**: Singleton with eager loading for consistent rendering
- **react-router**: Used independently in each application for internal routing

Note: The consumer doesn't specify remotes in the build configuration. Instead, remotes are registered dynamically at runtime.

## 🎯 Runtime Module Federation

This project uses **runtime Module Federation** instead of build-time configuration:

### Key Features:
- ✅ **No build dependencies**: Remote applications don't need to be built before running the consumer
- ✅ **Dynamic registration**: Remotes are registered at runtime using `registerRemotes()`
- ✅ **On-demand loading**: Modules are loaded dynamically with `loadRemote()`
- ✅ **Independent development**: Each application can be developed and deployed independently
- ✅ **Bridge router enabled**: Seamless navigation between host and remote applications
- ✅ **Error boundaries**: Graceful error handling with fallback UI

### How it works:

1. **Consumer** registers remotes dynamically in `App.tsx`:
```typescript
registerRemotes([
  { name: 'providerA', entry: 'http://localhost:3001/mf-manifest.json' },
  { name: 'providerB', entry: 'http://localhost:3002/mf-manifest.json' },
]);
```

2. **Remote components** are created using `createRemoteAppComponent`:
```typescript
const ProviderA = createRemoteAppComponent({
  loader: () => loadRemote('providerA/app'),
  loading: <div>Loading...</div>,
  fallback: ({ error }) => <div>Error: {error?.message}</div>,
});
```

3. **Providers** expose their applications using `createBridgeComponent`:
```typescript
export default createBridgeComponent({
  rootComponent: App,
});
```

This approach eliminates the need to configure remotes in `rsbuild.config.ts`, making the architecture more flexible and suitable for micro-frontend scenarios.

## 🛠️ Shared Configurations

### TypeScript
- `@repo/typescript-config/base.json`: Base configuration
- `@repo/typescript-config/react.json`: React-specific configuration

### ESLint
- `@repo/eslint-config/base.js`: Base configuration
- `@repo/eslint-config/react.js`: React-specific configuration

## 📚 Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Module Federation Documentation](https://module-federation.io/)
- [React Router Documentation](https://reactrouter.com/)
- [Rsbuild Documentation](https://rsbuild.dev/)
- [Module Federation Bridge React](https://module-federation.io/guide/basic/bridge.html)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## 📝 License

MIT
