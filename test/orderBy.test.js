import {expect} from 'chai';
import { orderBy, createCompareFunction } from '../src';

const removeSpaces = text => text.replace(/\s+/g, '');
const expectFunction = (left, right) => {
	left = removeSpaces(left.toString());
	right = removeSpaces(left.toString());
	expect(left).to.eql(right);
}

describe('orderBy', () => {

	it('createCompareFunction [a]', () => {
		const order = [['a']];
		const func = createCompareFunction(order);
		const expectFunc = function anonymous(left,right) {
			return left.a - right.a
		}

		expectFunction(expectFunc, func);
	});

	it('createCompareFunction [a, ASC]', () => {
		const order = [['a', 'ASC']];
		const func = createCompareFunction(order);
		const expectFunc = function anonymous(left,right) {
			return left.a - right.a
		}

		expectFunction(expectFunc, func);
	});

	it('createCompareFunction [a, DESC]', () => {
		const order = [['a', 'DESC']];
		const func = createCompareFunction(order);
		const expectFunc = function anonymous(left,right) {
			return right.a - left.a
		}

		expectFunction(expectFunc, func);
	});

	it('createCompareFunction [a, ASC],[b, ASC]', () => {
		const order = [['a', 'ASC'], ['b', 'ASC']];
		const func = createCompareFunction(order);
		const expectFunc = function anonymous(left,right) {
			return left.a - right.a || left.b - right.b
		}

		expectFunction(expectFunc, func);
	});

	it('createCompareFunction [a, DESC],[b, ASC]', () => {
		const order = [['a', 'DESC'], ['b', 'ASC']];
		const func = createCompareFunction(order);
		const expectFunc = function anonymous(left,right) {
			return  right.a - left.a || left.b - right.b
		}

		expectFunction(expectFunc, func);
	});

	it('createCompareFunction [a, DESC],[b, DESC]', () => {
		const order = [['a', 'DESC'], ['b', 'DESC']];
		const func = createCompareFunction(order);
		const expectFunc = function anonymous(left,right) {
			return  right.a - left.a || right.b - left.b
		}

		expectFunction(expectFunc, func);
	});

	it('orderBy [a]', () => {
		let items, expectItems;

		items = [{a: 1}, {a: 2}, {a: 3}];
		expectItems = [{a: 1}, {a: 2}, {a: 3}];

		expect(expectItems).to.eql(orderBy(items, ['a']));

		items = [{a: 3}, {a: 2}, {a: 1}];
		expectItems = [{a: 1}, {a: 2}, {a: 3}];

		expect(expectItems).to.eql(orderBy(items, ['a']));


		items = [{a: 3}, {a: 2}, {a: 2}];
		expectItems = [{a: 2}, {a: 2}, {a: 3}];

		expect(expectItems).to.eql(orderBy(items, ['a']));
	})

	it('orderBy ASC default', () => {
		let items, expectItems;

		items = [{a: 1}, {a: 2}, {a: 3}];
		expectItems = orderBy(items, ['a']);

		expect(expectItems).to.eql(orderBy(items, ['a', 'ASC']));

		items = [{a: 3}, {a: 2}, {a: 1}];
		expectItems = orderBy(items, ['a']);

		expect(expectItems).to.eql(orderBy(items, ['a', 'ASC']));
	})

	it('orderBy [a, DESC]', () => {
		let items, expectItems;

		items = [{a: 1}, {a: 2}, {a: 3}];
		expectItems = [{a: 3}, {a: 2}, {a: 1}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC']));

		items = [{a: 3}, {a: 2}, {a: 1}];
		expectItems = [{a: 3}, {a: 2}, {a: 1}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC']));


		items = [{a: 2}, {a: 3}, {a: 2}];
		expectItems = [{a: 3}, {a: 2}, {a: 2}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC']));
	})

	it('orderBy [a, ASC],[b, ASC]', () => {
		let items, expectItems;

		items = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 3, b: 2}];
		expectItems = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 3, b: 2}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'ASC'], ['b', 'ASC']));

		items = [{a: 1, b: 2}, {a: 1, b: 1}, {a: 3, b: 2}];
		expectItems = [{a: 1, b: 1}, {a: 1, b: 2}, {a: 3, b: 2}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'ASC'], ['b', 'ASC']));

		items = [{a: 1, b: 3}, {a: 1, b: 1}, {a: 1, b: 2}];
		expectItems = [{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'ASC'], ['b', 'ASC']));
	})

	it('orderBy [a, DESC],[b, ASC]', () => {
		let items, expectItems;

		items = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 3, b: 2}];
		expectItems = [{a: 3, b: 2}, {a: 2, b: 2}, {a: 1, b: 2}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC'], ['b', 'ASC']));

		items = [{a: 1, b: 2}, {a: 1, b: 1}, {a: 3, b: 2}];
		expectItems = [{a: 3, b: 2}, {a: 1, b: 1}, {a: 1, b: 2}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC'], ['b', 'ASC']));

		items = [{a: 1, b: 3}, {a: 1, b: 1}, {a: 1, b: 2}];
		expectItems = [{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC'], ['b', 'ASC']));
	})

	it('orderBy [a, DESC],[b, DESC]', () => {
		let items, expectItems;

		items = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 3, b: 2}];
		expectItems = [{a: 3, b: 2}, {a: 2, b: 2}, {a: 1, b: 2}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC'], ['b', 'DESC']));

		items = [{a: 1, b: 2}, {a: 1, b: 1}, {a: 3, b: 2}];
		expectItems = [{a: 3, b: 2}, {a: 1, b: 2}, {a: 1, b: 1}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC'], ['b', 'DESC']));

		items = [{a: 1, b: 3}, {a: 1, b: 1}, {a: 1, b: 2}];
		expectItems = [{a: 1, b: 3}, {a: 1, b: 2}, {a: 1, b: 1}];

		expect(expectItems).to.eql(orderBy(items, ['a', 'DESC'], ['b', 'DESC']));
	})


})