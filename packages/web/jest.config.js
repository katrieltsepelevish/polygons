/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    target: 'ES2022',
                    module: 'ESNext',
                    jsx: 'react-jsx',
                    moduleResolution: 'node',
                    verbatimModuleSyntax: false,
                    esModuleInterop: true,
                },
            },
        ],
    },
};
