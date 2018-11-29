export const createCompareFunction = orders => {
	const body = orders
		.map(([field, order = 'ASC']) => order === 'ASC' ? `left.${field} - right.${field}` : `right.${field} - left.${field}`)
		.join(' || ');

	return new Function('left', 'right', `return ${body}`);
}

export const orderBy = (items, ...orders) => items.sort(createCompareFunction(orders));
