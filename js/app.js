document.addEventListener('DOMContentLoaded', () => {
	const images = document.querySelectorAll('.parallax-image');
	const thumbnails = document.querySelectorAll('.thumbnail-section img');
	var currentIndex = -1;

	function imageSelect(index) {
		let targetThumb = thumbnails[index];
		let targetImage = images[index];
		let prevThumb = thumbnails[currentIndex];
		
		if (targetImage) {
			// Smooth scroll to the selected image
			window.scrollTo({
				top: targetImage.offsetTop + 30, // Adjust for header height
				behavior: 'smooth'
			});
		}
		// Update the active thumbnail only on refresh, 
		// otherwise scroll callback updates it.
		if (currentIndex == -1)
			targetThumb.classList.add('active');
		currentIndex = index;
	}

	thumbnails.forEach((thumbnail, index) => {
		thumbnail.addEventListener('click', function() {
			imageSelect(index);
		});
	});

	imageSelect(0);

	window.addEventListener('scroll', () => {
		const scrollPosition = window.scrollY;
		// console.log("image: %o", images[0])
		// var imageHeight = window.innerHeight - 70;
		var style = images[0].currentStyle || window.getComputedStyle(images[0]);
		var marginBottom = parseInt(style.marginBottom, 10);
		var imageHeight = images[0].offsetHeight + marginBottom;
		var index = Math.round(scrollPosition /  imageHeight);
		// console.log("scrollY: %d, innerheight: %d, index: %d", scrollPosition, imageHeight, index)
		if (index < 0)
			index = 0;
		else if (index >= images.length)
			index = images.length - 1;
		
		if (index != currentIndex) {
			// Update the active thumbnail
			let targetThumb = thumbnails[index];
			let prevThumb = thumbnails[currentIndex];
			// console.log("prevThumb: %s, currentThumb: %s",
			// 	prevThumb.src, targetThumb.src)
			prevThumb.classList.remove('active');
			targetThumb.classList.add('active');
			currentIndex = index;	
		}
	});  
});
