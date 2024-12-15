// Carousel Class
let Carousel = function (node, buttons) {
    this.domNode = node;
    this.carouselItemNodes = node.querySelectorAll('.carousel-item');
    this.currentIndex = 0;
    this.isPlaying = false;
    this.interval = null;

    // Buttons
    this.previousButtonNode = buttons.previous;
    this.nextButtonNode = buttons.next;
    this.pausePlayButtonNode = buttons.play;

    // Event Listeners
    this.previousButtonNode.addEventListener('click', this.showPrevious.bind(this));
    this.nextButtonNode.addEventListener('click', this.showNext.bind(this));
    this.pausePlayButtonNode.addEventListener('click', this.togglePlayPause.bind(this));

    this.showItem(this.currentIndex);
};

Carousel.prototype.showItem = function (index) {
    this.carouselItemNodes.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    this.currentIndex = index;
};

Carousel.prototype.showPrevious = function () {
    const previousIndex = (this.currentIndex - 1 + this.carouselItemNodes.length) % this.carouselItemNodes.length;
    this.showItem(previousIndex);
};

Carousel.prototype.showNext = function () {
    const nextIndex = (this.currentIndex + 1) % this.carouselItemNodes.length;
    this.showItem(nextIndex);
};

Carousel.prototype.togglePlayPause = function () {
    this.isPlaying = !this.isPlaying;
    const playImg = this.pausePlayButtonNode.querySelector('.icon');
    playImg.src = this.isPlaying ? 'pause.png' : 'play.png';

    if (this.isPlaying) {
        this.interval = setInterval(() => this.showNext(), 3000);
    } else {
        clearInterval(this.interval);
    }
};

Carousel.prototype.showRandomItem = function () {
    const randomIndex = Math.floor(Math.random() * this.carouselItemNodes.length);
    this.showItem(randomIndex);
};

// Initialize Carousels

let topCarouselInstance, bottomCarouselInstance;

document.addEventListener('DOMContentLoaded', function () {
    // Top Carousel
    const topCarousel = document.querySelector('#topCarousel');
    const topButtons = {
        previous: document.getElementById('rwd-button-1'),
        next: document.getElementById('fwd-button-1'),
        play: document.getElementById('play-button-1'),
    };
    topCarouselInstance = new Carousel(topCarousel, topButtons);

    // Bottom Carousel
    const bottomCarousel = document.querySelector('#bottomCarousel');
    const bottomButtons = {
        previous: document.getElementById('rwd-button-2'),
        next: document.getElementById('fwd-button-2'),
        play: document.getElementById('play-button-2'),
    };
    bottomCarouselInstance = new Carousel(bottomCarousel, bottomButtons);

    // Dress Me Button
    const dressMeButton = document.querySelector('#dress-me-button');
    dressMeButton.addEventListener('click', function () {
        topCarouselInstance.showRandomItem();
        bottomCarouselInstance.showRandomItem();
    });
});