class Gallery {
	constructor() {
		this.currentIndex = 0;
		let gallery = document.querySelector('#gallery');
		this.images = gallery.querySelectorAll('img');
		this.images[this.currentIndex].classList.add('active');
		setInterval(() => this.showNext(), 10000);
		gallery.addEventListener('click', () => this.showNext());
	}
	showNext() {
		this.images[this.currentIndex].classList.remove('active');
		this.currentIndex = (this.currentIndex + 1) % this.images.length;
		this.images[this.currentIndex].classList.add('active');
	}
}
const gallery = new Gallery();


class Quotes {
	constructor() {
		this.currentIndex = 0;
		let quotes = document.querySelector('#quotes');
		this.quotes = quotes.querySelectorAll('div');
		this.quotes[this.currentIndex].classList.add('active');
		setInterval(() => this.showNext(), 10000);
		quotes.addEventListener('click', () => this.showNext());
	}
	showNext() {
		this.quotes[this.currentIndex].classList.remove('active');
		this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
		this.quotes[this.currentIndex].classList.add('active');
	}
}
const quotes = new Quotes();

let quotes_height = 0;
document.querySelectorAll('#quotes div').forEach(quote => {
  const quote_height = quote.clientHeight;
  if (quote_height > quotes_height) {
    quotes_height = quote_height;
  }
});
document.querySelector('#quotes').style.height = `${quotes_height}px`;
