import {
  apply,
  chain,
  mergeWith,
  move,
  template,
  url,
  Tree,
  Rule
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { addDepsToPackageJson } from '@nrwl/schematics/src/utils/ast-utils';

function addReactComponent(opts: any): Rule {
  return (host: Tree) => {
    // We can read files off of the Tree
    const angularJson = JSON.parse(host.read('angular.json').toString());
    const project = angularJson.projects[opts.project];
    const src = project.sourceRoot;
    const fileName = strings.dasherize(opts.name);
    const componentName = strings.classify(opts.name);
    const indexFile = host.read(`${src}/index.ts`);

    // We can also overwrite files in the Tree
    host.overwrite(
      `${src}/index.ts`,
      `${indexFile.toString()}\nexport * from './lib/${fileName}/${fileName}';`
    );

    // Angular devkit comes with helper functions to perform common operations on the Tree
    const templateSource = apply(url('./files'), [
      template({
        tmpl: '',
        fileName, // File name is kebab-cased
        componentName, // Component is MixedCased
        tagName: opts.tag // Allows user to override default `div` element
      }),
      move(`${src}/lib/${fileName}`)
    ]);
    return mergeWith(templateSource);
  };
}

export default function(opts: any): Rule {
  // The Tree here represents the filesystem
  return chain([
    addDepsToPackageJson(
      { '@types/styled-components': '4.1.12', 'styled-components': '4.1.3' },
      {}
    ),
    addReactComponent(opts)
  ]);
}
