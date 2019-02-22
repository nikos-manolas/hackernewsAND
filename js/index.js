//Starting here to fetch the topStories
//Potentially add from here more urls like newstories etc.
const page = 'topstories';

//we would possibly have a switch case to choose which type of news to have (the top or the most recent depending on the api capability)
try{
	fetchURL(`https://hacker-news.firebaseio.com/v0/${page}.json?print=pretty`).catch(error => console.error(error));
}
catch(error) {
	console.error(`error on trying to fetchURL: ${error}`);
	throw Error(error);
}
