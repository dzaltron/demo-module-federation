import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            dts: false,
            name: 'providerA',
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
        }),
    ],
    server: {
        port: 3001,
        host: 'localhost',
    },
    dev: {
        assetPrefix: 'http://localhost:3001',
    },
});
