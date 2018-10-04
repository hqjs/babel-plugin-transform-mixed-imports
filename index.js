module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(nodePath) {
        const { specifiers, source } = nodePath.node;
        const namedSpec = specifiers.filter(s => t.isImportSpecifier(s));
        const defaultSpec = specifiers.filter(s => t.isImportDefaultSpecifier(s));

        if (namedSpec.length === 0 || defaultSpec.length === 0) return;

        nodePath.node.specifiers = namedSpec;

        for (const spec of defaultSpec) {
          const importDefault = t.importDeclaration([ spec ], source);
          nodePath.insertBefore(importDefault);
        }
      },
    },
  };
};
