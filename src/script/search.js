function searchProduct () {
	const input = document.getElementById('searchInput').value.toLowerCase();
	// debugger
	const goodsList = document.getElementById('goodsList');
	const cards = document.getElementsByClassName('card');

	for (let i = 0; i < cards.length; i++) {
		let brandOfCard = cards[i].querySelector('.goods__desc_brand');

		let nameOfCard = cards[i].querySelector('.goods__desc_name');
		if (brandOfCard.innerText.toLowerCase().indexOf(input) > -1 || nameOfCard.innerText.toLowerCase().indexOf(input) > -1) {
			cards[i].style.display = "";
		} else {
			cards[i].style.display = "none";
		}
	}

}


export {searchProduct}

