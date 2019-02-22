const getComments = async function (commentIds, olInside) {
	try{
		const arrayOfCommentPromises = commentIds.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));
		
		//for await loop to fetch all comment details.
		for await (let commentResp of arrayOfCommentPromises) {
			const comment = await commentResp.json();
			if (isNotNullAndUndefined(comment)) {
				const {text, by} = comment;

				const li = createMyElement("li");
				append(li, writeText(`${text} --- by: ${by}`));
				append(olInside, li);				
			}
		}		
	}
	catch(error) {
		console.error(`Error getting comments: ${error}`);
		throw Error(error);
	}

}
