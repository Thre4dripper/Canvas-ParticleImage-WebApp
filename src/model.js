const state = {
    particles: [],
    imageData: [],
    mouseEvent: {
        x: null, y: null, radius: 70
    },
    image: null,
    imageSize: undefined,
    imagePosX: undefined,
    imagePosY: undefined,
    renderMode: 'drag',
    imageQuality: undefined,
    rainMode: 'full',
    stripsType: 'horizontal',
    rainAmount: undefined,
    rainVelocityX: undefined,
    rainVelocityY: undefined,
    distMode: 'repulsion',
    distRadius: undefined,
    distSpeed: undefined,
    distRetain: undefined,
    showTrails: false,
    trailsAmount: undefined,
}

export const setDefaultValues = (val) => {
        state.imageSize = val.imageSizeVal;
        state.imagePosX = val.imagePosXVal;
        state.imagePosY = val.imagePosYVal;
        state.imageQuality = val.imageQualityVal;

        state.rainAmount = val.rainAmountVal;
        state.rainVelocityX = val.rainVelocityXVal;
        state.rainVelocityY = val.rainVelocityYVal;

        state.distRadius = val.distRadiusVal;
        state.distSpeed = val.distSpeedVal;
        state.distRetain = val.distRetainVal;

        state.trailsAmount = val.trailsAmountVal;
}

export const resetParticles = () => state.particles = [];

export const setImageData = (data) => state.imageData = data;
export const setImage = (url) => state.image = url;

export const setImageSize = (size) => state.imageSize = size;
export const setImagePosX = (posX) => state.imagePosX = posX;
export const setImagePosY = (posY) => state.imagePosY = posY;

export const setRenderMode = (mode) => state.renderMode = mode;
export const setImageQuality = (quality) => state.imageQuality = quality;

export const setRainMode = (mode) => state.rainMode = mode;
export const setStripsType = (type) => state.stripsType = type;
export const setRainAmount = (amount) => state.rainAmount = amount;
export const setRainVelocityX = (velocityX) => state.rainVelocityX = velocityX;
export const setRainVelocityY = (velocityY) => state.rainVelocityY = velocityY;

export const setDistMode = (mode) => state.distMode = mode;
export const setDistRadius = (radius) => state.distRadius = radius;
export const setDistSpeed = (speed) => state.distSpeed = speed;
export const setDistRetain = (retain) => state.distRetain = retain;

export const setShowTrails = (showTrails) => state.showTrails = showTrails;
export const setTrailsAmount = (amount) => state.trailsAmount = amount;

export default state;