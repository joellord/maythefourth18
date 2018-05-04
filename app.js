// Tracker stuff

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const tracker = new tracking.ObjectTracker('face')

tracker.setEdgesDensity(0.11);
tracker.setInitialScale(3.4);
tracker.setStepSize(1);
tracking.track('#webcamFeed', tracker, { camera: true })

tracker.on('track', event => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  event.data.forEach(rect => {
    context.drawImage(filter.img, 
    	rect.x + (filter.offsetX * rect.width),
	    rect.y + (filter.offsetY * rect.height),
	    filter.scaleX * rect.width,
	    filter.scaleY * rect.height
	 );
  });
});

let images = {
	chewie: {
		src: "./img/chewie.png",
		offsetX: -0.25,
		offsetY: -0.4,
		scaleX: 1.5,
		scaleY: 1.5
	},
	darthvader: {
		src: "./img/darthvader.png",
		offsetX: -0.12,
		offsetY: -0.35,
		scaleX: 1.3,
		scaleY: 1.4
	},
	yoda: {
		src: "./img/yoda.png",
		offsetX: -0.35,
		offsetY: -0.6,
		scaleX: 1.8,
		scaleY: 1.7
	}
};

let filter = {
	img: new Image(),
	offsetX: 0,
	offsetY: 0,
	scaleX: 1,
	scaleY: 1
};

setImage = (imageName) => {
	if (!images[imageName]) {
		console.log(`Invalid image, should be one of ` + Object.keys(images).join(", "));
		return;
	}

	filter.img.src = images[imageName].src;
	filter.offsetX = images[imageName].offsetX;
	filter.offsetY = images[imageName].offsetY;
	filter.scaleX = images[imageName].scaleX;
	filter.scaleY = images[imageName].scaleY;
}

setImage("chewie");

// UI Controls
document.querySelectorAll("button").forEach(btn => {
	btn.addEventListener("click", event => {
		document.querySelectorAll("button").forEach(e => {
			e.classList.remove("btn-primary");
			e.classList.add("btn-secondary");
		});
		event.target.classList.add("btn-primary");
		event.target.classList.remove("btn-secondary");
		setImage(event.target.id);
	});
});