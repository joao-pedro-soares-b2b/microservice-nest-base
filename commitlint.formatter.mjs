import { format } from '@commitlint/format';

export default (results) => {
  const output = format(results, {});

  return `${output}
  - Para facilitar, utilize o comando 
  $ npm run commit\n`;
};
