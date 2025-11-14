import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            name: 'consumer',
            shared: {
                react: { singleton: true, eager: true, },
                'react-dom': { singleton: true, eager: true, },
            },
        }),
    ],
    server: {
        port: 3000,
        host: 'localhost',
    },
    dev: {
        assetPrefix: 'http://localhost:3000',
    },
});
