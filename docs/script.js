class Gallery {
	constructor() {
		this.currentIndex = 0;
		let gallery = document.querySelector('#gallery');
		gallery.style.position = 'relative';
		this.images = gallery.querySelectorAll('img');
		this.images[this.currentIndex].classList.add('active');
		this.images.forEach(image => image.style.position = 'absolute');
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
