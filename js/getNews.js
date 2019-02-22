const numberOfComments = (comments) => {
	return comments !== undefined ? comments.length : 0;
}

const isNotNullAndUndefined = (parameter) => {
	if (parameter !== null && parameter !== undefined) {
		return true;
	}
	return false;
}

const onClickHandler = (eachArticleInList, comments) => {
	return () => {
		try{
			if (eachArticleInList.classList.contains('not-showing-comments')) {
				removeClass(eachArticleInList, 'not-showing-comments');
				changeClasses(eachArticleInList.childNodes[1], 'colorGray', 'colorRed');

				const olInside = createMyElement('ol');
				addClass(olInside, 'smallerFont');
				append(eachArticleInList, olInside);
				if(numberOfComments(comments) !== 0) {
					//To show the comments the getComments function is called on getComments.js
					getComments(comments, olInside).catch(error => console.error(error));					
				}
			} else {
				//essentialy closing the opened comments section.
				addClass(eachArticleInList, 'not-showing-comments');
				changeClasses(eachArticleInList.childNodes[1], 'colorRed', 'colorGray');
				eachArticleInList.removeChild(eachArticleInList.childNodes[2]);
			}				
		}
		catch(error){
			console.log(error);
			throw error;
		}
	}
}

const forEachArticle = (article, orderedListofNews) => {
	if (!isNotNullAndUndefined(article)) {
		return;
	}
	const {url: myUrl, title, kids} = article;
	//creating each article in the ordered list
	//creating the div which holds the "a" element href to click on the link
	const eachArticleInList = createMyElement('li');
	const divForEachArticle = createMyElement('div');

	//building up the a element to href the article's url
	const aElement = createMyElement('a');
	aElement.setAttribute('href', myUrl);
	append(aElement, writeText(title));
	
	//appending to the li the a, div
	//adding a class not-showing-comments which is when the comments section is closed
	append(eachArticleInList, aElement);
	append(eachArticleInList, divForEachArticle);
	addClass(eachArticleInList, 'not-showing-comments');

	append(divForEachArticle, writeText(`${numberOfComments(kids)} comments`));
	addClass(divForEachArticle, 'commentClass');
	addClass(divForEachArticle, 'colorGray');
	
	append(orderedListofNews, eachArticleInList);		
	//eventListener for each comment Button
	//when user presses comment button it will open up the comments
	//when user presses again it will close them.
	//this is done by adding and removing the class: not-showing-comments.
	divForEachArticle.addEventListener('click', onClickHandler(eachArticleInList, kids));	
}

const fetchURL = async function (url) {
	try{
		const response = await fetch(url);
		const news = await response.json();
		//getting top news ids and mapping them to fetch each article title, commentts.
		const arrayofArticlePromises = news.map(article => fetch(`https://hacker-news.firebaseio.com/v0/item/${article}.json?print=pretty`));
		const orderedListofNews = getMyElement('news');

		//this will run synchronously getting one by one each news article and showing it.
		for await (let articleResp of arrayofArticlePromises) {
			const article = await articleResp.json();
			if(isNotNullAndUndefined(article)) {		
				forEachArticle(article, orderedListofNews);				
			}
		}		
	} 
	catch(error) {
		console.error(`error retrieving data from api: ${error}`);
		throw Error(error);
	}

	
	// when the await for loop has finished it will run.
	changeClasses(getMyElement('loader'), 'show', 'hide');
}

