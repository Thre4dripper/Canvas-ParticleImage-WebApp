import ctx, * as View from './view.js';
import modelState, * as Model from './model.js';
import Particle from "./Particle.js";
import * as Utils from "./utils.js";

let label;
View.restart(() => drawImage(modelState.image));
View.setDefault((val, submitLabel) => {
    Model.setDefaultValues(val)
    label = submitLabel
});

//image box controllers
View.imageSelectionHandler()
View.fileInputHandler((val) => {
    Utils.encodeImageFileAsURL(val.target, data => {
        Model.setImage(data);
        drawImage(modelState.image);
    })
});
View.imageUrlHandler((val) => {
    //loading
    Utils.showLoading(label);
    if (val.includes('http')) {
        Utils.toDataURL(val, (data) => {
            Model.setImage(data)
            drawImage(modelState.image)
        })
    } else {
        Model.setImage(val)
        drawImage(modelState.image)
    }
})
View.imageSizeHandler((e) => {
    Model.setImageSize(+e.target.value);
    drawImage(modelState.image);
})
View.imagePosXHandler((e) => {
    Model.setImagePosX(+e.target.value);
    drawImage(modelState.image);
})
View.imagePosYHandler((e) => {
    Model.setImagePosY(+e.target.value);
    drawImage(modelState.image);
})

//render mode controllers
View.renderRadiosHandler((mode) => {
    Model.setRenderMode(mode);
    drawImage(modelState.image);
});
View.imageQualityHandler((e) => {
    Model.setImageQuality(+e.target.value);
    drawImage(modelState.image);
});


//rain controllers
View.rainRadiosHandler((mode) => {
    Model.setRainMode(mode);
    drawImage(modelState.image);
})
View.stripsRadiosHandler((type) => {
    Model.setStripsType(type);
    drawImage(modelState.image);
})
View.rainAmountHandler((e) => {
    Model.setRainAmount(+e.target.value);
    drawImage(modelState.image);
})
View.rainVelocityXHandler((e) => {
    Model.setRainVelocityX(+e.target.value);
})
View.rainVelocityYHandler((e) => {
    Model.setRainVelocityY(+e.target.value);
})

//distortion box controllers
View.distRadiosHandler((mode) => {
    Model.setDistMode(mode);
    drawImage(modelState.image);
})
View.distRadiusHandler((e) => {
    Model.setDistRadius(+e.target.value);
    drawImage(modelState.image);
})
View.distSpeedHandler((e) => {
    Model.setDistSpeed(+e.target.value);
    drawImage(modelState.image);
})
View.distRetainHandler((e) => {
    Model.setDistRetain(+e.target.value);
    drawImage(modelState.image);
})

//trails box controllers
let alpha = 1;
View.showTrailsHandler((val) => Model.setShowTrails(val));
View.trailsAmountHandler((e) => Model.setTrailsAmount(+e.target.value));

function drawImage(url) {
    const img = new Image();
    img.src = url;
    let imgWidth, imgHeight, data;

    img.onload = () => {
        //success
        Utils.showSuccess(label);

        const larger = Math.max(img.width, img.height);
        const sizeScale = modelState.imageSize * 3
        imgWidth = img.width / (larger / sizeScale);
        imgHeight = img.height / (larger / sizeScale);
        ctx.drawImage(img, 100, 0, imgWidth, imgHeight);
        data = ctx.getImageData(100, 0, imgWidth, imgHeight);
        Model.setImageData(data);
        Model.resetParticles();
        ctx.clearRect(0, 0, View.canvasWidth, View.canvasHeight);

        modelState.renderMode === 'rain' ? particleRain() : drawParticles();
    }

    //error
    img.onerror = () => Utils.showError(label)
}

function drawParticles() {
    const data = modelState.imageData;
    const imageQuality = modelState.imageQuality;
    let imagePositionX, imagePositionY;

    for (let i = 0; i < data.height; i += imageQuality) {
        for (let j = 0; j < data.width; j += imageQuality) {
            if (data.data[i * data.width * 4 + j * 4 + 3] > 128) {
                const r = data.data[i * data.width * 4 + j * 4];
                const g = data.data[i * data.width * 4 + j * 4 + 1];
                const b = data.data[i * data.width * 4 + j * 4 + 2];

                imagePositionX = (View.canvasWidth - data.width) / 100 * modelState.imagePosX;
                imagePositionY = (View.canvasHeight - data.height) / 100 * modelState.imagePosY;

                modelState.particles.push(new Particle(
                    j * 3 + imagePositionX,
                    i * 3 + imagePositionY,
                    imageQuality, r, g, b
                ));
            }
        }
    }
}

function particleRain() {
    const data = modelState.imageData;
    let imagePositionX, imagePositionY;

    for (let i = 0; i < modelState.rainAmount * 100; i++) {
        imagePositionX = (View.canvasWidth - data.width) / 100 * modelState.imagePosX;
        imagePositionY = (View.canvasHeight - data.height) / 100 * modelState.imagePosY;

        modelState.particles.push(new Particle(//TODO vertical strip control
            Math.random() * data.width * 3 / (modelState.rainMode === 'strips' && modelState.stripsType === 'vertical' ? 4 : 1) +
            imagePositionX,
            Math.random() * data.height * 3 / (modelState.rainMode === 'strips' && modelState.stripsType === 'horizontal' ? 4 : 1) +
            imagePositionY,
            modelState.imageSize / 20,
            '', '', '',
            imagePositionX,
            imagePositionY
        ));
    }
}

View.canvasMouseMove((e) => {
    modelState.mouseEvent.x = e.offsetX;
    modelState.mouseEvent.y = e.offsetY;
    modelState.mouseEvent.radius = modelState.distRadius;
});
View.canvasMouseLeave(() => {
    modelState.mouseEvent.x = null;
    modelState.mouseEvent.y = null;
    modelState.mouseEvent.radius = null;
})

const animate = () => {
    if (modelState.showTrails) {
        ctx.fillStyle = `rgba(17, 24, 39, ${alpha})`;
        ctx.fillRect(0, 0, View.canvasWidth, View.canvasHeight);
    } else {
        ctx.clearRect(0, 0, View.canvasWidth, View.canvasHeight);
    }

    modelState.particles.forEach(particle => {
        if (modelState.renderMode === 'rain')
            particle.particleRainUpdate(ctx);
        else particle.mouseDragUpdate(ctx)
    });

    if (modelState.particles.every(p => p.x === p.initX) && modelState.particles.every(p => p.y === p.initY) && alpha < 1) alpha += 0.1;
    if (modelState.particles.some(p => p.x !== p.initX) || modelState.particles.some(p => p.y !== p.initY)) alpha = 1 / (modelState.trailsAmount * 2);

    requestAnimationFrame(animate);
}
animate()