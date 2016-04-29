System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  map: {
    app: 'app',
    typescript: 'node_modules/typescript/lib/typescript.js',
  },
  packages: {
    app: {
      defaultExtension: 'ts',
      main: 'main.ts',
    }
  }
});