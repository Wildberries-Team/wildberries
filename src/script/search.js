import {blockCard, lowblockCard} from "./cards";

function searchProduct (e, cardsArray) {
	const searchString = e.target.value.toLowerCase();
	const filteredCards = cardsArray.filter ( card => {
		return (
			card.title.toLowerCase().includes(searchString) ||
			card.category.toLowerCase().includes(searchString)
		)
	}).slice(0, 36);
		blockCard(filteredCards);
}
export {searchProduct}
