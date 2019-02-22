let assert = chai.assert;
const comments = ['1','2','3','4','5','6'];

describe("getNews", () => {

	it("numberOfComments returns 0 if comments is undefined", () => {
		assert.equal(numberOfComments(undefined), 0);
	});

	it("numberOfComments returns 6 if comments length is 6", () => {
		assert.equal(numberOfComments(comments), 6);
	});

	it("isNotNullAndUndefined returns true when sending an object", () => {
		assert.equal(isNotNullAndUndefined(comments), true);
	});

	it("isNotNullAndUndefined returns false when sending undefined or null", () => {
		assert.equal(isNotNullAndUndefined(null), false);
	});

	const orderedListofNews = getMyElement('news');
	it("forEachArticle returns if articles are null", () => {
		assert.equal(forEachArticle(null, orderedListofNews), undefined);
	})
});


