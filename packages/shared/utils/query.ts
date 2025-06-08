export function parseQuery(queryString: string) {
  if (!queryString) return {};

  const conditions = queryString.split(/\s+(AND|OR)\s+/);
  const parsedQuery: any = {};
  let currentOperator = '_and';

  conditions.forEach((condition, index) => {
    if (condition === 'AND') {
      currentOperator = '_and';
    } else if (condition === 'OR') {
      currentOperator = '_or';
    } else {
      const [field, value] = condition.split(':');
      const parsedValue = value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)  // Remove quotes for exact matches
        : value;

      if (!parsedQuery[currentOperator]) {
        parsedQuery[currentOperator] = [];
      }
      parsedQuery[currentOperator].push({ [field]: { _eq: parsedValue } });
    }
  });

  return parsedQuery;
}