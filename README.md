# Demo Module Federation com Turborepo

Este é um projeto de demonstração que utiliza **Turborepo**, **Module Federation** e **React Router DOM** com o padrão **Bridge** para criar uma arquitetura de micro-frontends.

## 🏗️ Estrutura do Projeto

```
demo-module-federation/
├── packages/
│   ├── consumer/          # Aplicação host (porta 3000)
│   ├── provider-a/        # Aplicação remota A (porta 3001)
│   ├── provider-b/        # Aplicação remota B (porta 3002)
│   ├── typescript-config/ # Configurações TypeScript compartilhadas
│   └── eslint-config/     # Configurações ESLint compartilhadas
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 🚀 Tecnologias Utilizadas

- **Turborepo**: Sistema de build de alto desempenho para monorepos
- **Module Federation**: Permite compartilhamento de código entre aplicações em tempo de execução
- **React Router v7**: Roteamento declarativo para React
- **@module-federation/bridge-react**: Padrão Bridge para integração perfeita entre aplicações
- **Rsbuild**: Build tool moderno e performático
- **TypeScript**: Tipagem estática
- **pnpm**: Gerenciador de pacotes eficiente

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- pnpm >= 8.15.0

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositório>
cd demo-module-federation
```

2. Instale as dependências:
```bash
pnpm install
```

## 🎯 Como Executar

### Desenvolvimento

Para iniciar todas as aplicações em modo de desenvolvimento:

```bash
pnpm dev
```

Isso iniciará:
- **Consumer** em http://localhost:3000
- **Provider A** em http://localhost:3001
- **Provider B** em http://localhost:3002

### Executar aplicações individualmente

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

Para fazer o build de todas as aplicações:

```bash
pnpm build
```

### Lint

Para executar o linting em todos os pacotes:

```bash
pnpm lint
```

### Limpar

Para limpar os artefatos de build:

```bash
pnpm clean
```

## 🎨 Funcionalidades

### Consumer (Host Application)
- Aplicação principal que consome os módulos remotos
- Navegação entre diferentes providers via React Router
- Lazy loading dos módulos remotos
- Fallback de carregamento

### Provider A
- Módulo remoto exposto via Module Federation
- Rotas internas:
  - `/` - Home
  - `/about` - Sobre
  - `/contact` - Contato
- Tema verde (#4CAF50)

### Provider B
- Módulo remoto exposto via Module Federation
- Rotas internas:
  - `/` - Dashboard
  - `/settings` - Configurações
  - `/reports` - Relatórios
- Tema azul (#2196F3)

## 🔌 Arquitetura Module Federation

### Consumer (rsbuild.config.ts)
```typescript
pluginModuleFederation({
  name: 'consumer',
  remotes: {
    providerA: 'providerA@http://localhost:3001/mf-manifest.json',
    providerB: 'providerB@http://localhost:3002/mf-manifest.json',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router': { singleton: true },
  },
})
```

### Providers (rsbuild.config.ts)
```typescript
pluginModuleFederation({
  name: 'providerA', // ou 'providerB'
  exposes: {
    './app': './src/export-app.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router': { singleton: true },
  },
  bridge: {
    enableBridgeRouter: true,
  },
})
```

## 🌉 Bridge Pattern

O Bridge Pattern é utilizado para integração perfeita entre as aplicações:

```typescript
// Provider - export-app.tsx
import { createBridgeComponent } from '@module-federation/bridge-react';
import App from './App';

export default createBridgeComponent({
  rootComponent: App,
});

// Consumer - App.tsx
import { createBridgeComponent } from '@module-federation/bridge-react';

const ProviderA = createBridgeComponent(() => import('providerA/app'));
```

## 📦 Shared Dependencies

As dependências compartilhadas entre as aplicações incluem:
- **react**: Singleton para garantir uma única instância
- **react-dom**: Singleton para renderização consistente
- **react-router**: Singleton para roteamento unificado

## 🛠️ Configurações Compartilhadas

### TypeScript
- `@repo/typescript-config/base.json`: Configuração base
- `@repo/typescript-config/react.json`: Configuração específica para React

### ESLint
- `@repo/eslint-config/base.js`: Configuração base
- `@repo/eslint-config/react.js`: Configuração específica para React

## 📚 Recursos Adicionais

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Module Federation Documentation](https://module-federation.io/)
- [React Router Documentation](https://reactrouter.com/)
- [Rsbuild Documentation](https://rsbuild.dev/)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📝 Licença

MIT
