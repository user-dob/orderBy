export const createCompareFunction = orders => {
	const body = orders
		.map(([field, order = 'ASC']) => order === 'ASC' ? `left.${field} - right.${field}` : `right.${field} - left.${field}`)
		.join(' || ');

	return new Function('left', 'right', `return ${body}`);
}

export const orderBy = (items, ...orders) => {
	return items
		.map(item => {
			return orders.reduce((data, [field, order, compare]) => {
				const value = item[field];
				data[field] = compare ? compare(value) : value;
				return data;
			}, {__value: item});
		})
		.sort(createCompareFunction(orders))
		.map(item => item.__value);
};
