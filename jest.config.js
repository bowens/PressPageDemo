module.exports = {
    setupFilesAfterEnv: [
    ],
    testMatch: [
        '**/?(*.)test.ts?(x)'
    ],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
    }
}