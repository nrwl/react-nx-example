import {
  apply,
  url,
  template,
  move,
  mergeWith,
  Tree,
  Rule
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export default function(opts: any): Rule {
  return (host: Tree) => {
    const angularJson = JSON.parse(host.read('angular.json').toString());
    const project = angularJson.projects[opts.project];
    const src = project.sourceRoot;
    const fileName = strings.dasherize(opts.name);
    const componentName = strings.classify(opts.name);
    const indexFile = host.read(`${src}/index.ts`);
    host.overwrite(
      `${src}/index.ts`,
      `${indexFile.toString()}\nexport * from './lib/${fileName}/${fileName}';`
    );

    const templateSource = apply(url('./files'), [
      template({
        tmpl: '',
        fileName,
        componentName
      }),
      move(`${src}/lib/${fileName}`)
    ]);
    return mergeWith(templateSource);
  };
}
