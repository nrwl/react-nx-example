import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  template,
  url,
  Rule,
  Tree
} from '@angular-devkit/schematics';
import { formatFiles } from '@nrwl/schematics/src/utils/rules/format-files';

export default function(schema: any): Rule {
  return chain([
    externalSchematic('@nrwl/schematics', 'lib', {
      directory: '',
      name: schema.name,
      style: 'scss',
      framework: 'none',
      tags: '',
      unitTestRunner: 'jest'
    }),
    (host: Tree) => {
      const tsConfig = JSON.parse(
        host.read(`libs/${schema.name}/tsconfig.json`).toString()
      );
      const tsConfigSpec = JSON.parse(
        host.read(`libs/${schema.name}/tsconfig.spec.json`).toString()
      );
      tsConfig.compilerOptions.jsx = 'react';
      tsConfig.include = ['**/*.ts', '**/*.tsx'];
      tsConfigSpec.include = ['**/*.ts', '**/*.tsx'];
      host.overwrite(
        `libs/${schema.name}/tsconfig.json`,
        JSON.stringify(tsConfig, null, 2)
      );
      host.overwrite(
        `libs/${schema.name}/tsconfig.spec.json`,
        JSON.stringify(tsConfigSpec, null, 2)
      );
    },
    (host: Tree) => {
      host.delete(`libs/${schema.name}/jest.config.js`);
    },
    mergeWith(
      apply(url('./files'), [
        template({
          tmpl: '',
          name: schema.name
        }),
        move(`libs/${schema.name}`)
      ])
    ),
    formatFiles()
  ]);
}
