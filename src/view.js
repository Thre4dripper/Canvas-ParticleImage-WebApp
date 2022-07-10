import $ from 'jquery';

const canvas = $('#canvas')[0];
const canvasContainer = $('#canvas-container')

//image  box
const imageRadios = $('#image-radios-container');
const imageInput = $('#image-input');
const imageURL = $('#image-url')
const imageUrlLabel = $('#url-label')
const imageSize = $('#image-size-slider')
const imagePosX = $('#image-posX-slider')
const imagePosY = $('#image-posY-slider')

//render mode box
const renderRadios = $('#render-radios-container');
const imageQuality = $('#quality-slider')

//rain box
const rainRadios = $('#rain-radios-container');
const stripsRadios = $('#strips-radios-container');
const rainAmount = $('#rain-amount-slider');
const rainVelocityX = $('#rain-velocityX-slider');
const rainVelocityY = $('#rain-velocityY-slider');

//distribution box
const distRadios = $('#dist-radios-container');
const distRadius = $('#dist-radius-slider');
const distSpeed = $('#dist-speed-slider');
const distRetain = $('#retain-speed-slider');

//trails box
const trailsCheckbox = $('#trails-checkbox');
const trailsAmount = $('#trails-amount-slider');

//show/hide controls box buttons
const showControlsBtn = $('#show-controls-button');
const hideControlsBtn = $('#hide-controls-button');

let canvasWidth = canvasContainer.width();
let canvasHeight = canvasContainer.height();

canvas.width = canvasWidth;
canvas.height = canvasHeight;
let ctx = canvas.getContext('2d');

//resize canvas size
const resizeCanvas = () => {
    canvasWidth = canvasContainer.width();
    canvasHeight = canvasContainer.height();

    canvas.width = canvasWidth
    canvas.height = canvasHeight;
}
//recalculate canvas size on window resize and show/hide controls
export const restart = (handler) => {

    $(window).resize(function () {
        ctx = canvas.getContext("2d");
        resizeCanvas();
        handler(imageUrlLabel);
    });

    hideControlsBtn.click(() => {
        $('#controller-container').hide();
        showControlsBtn.show();
        resizeCanvas();
        handler();
    })

    showControlsBtn.click(() => {
        $('#controller-container').show();
        showControlsBtn.hide();
        resizeCanvas();
        handler();
    });
}

export const setDefault = (handler) => {
    const imageSizeVal = +imageSize.val();
    const imagePosXVal = +imagePosX.val();
    const imagePosYVal = +imagePosY.val();
    const imageQualityVal = +imageQuality.val();

    const rainAmountVal = +rainAmount.val();
    const rainVelocityXVal = +rainVelocityX.val();
    const rainVelocityYVal = +rainVelocityY.val();

    const distRadiusVal = +distRadius.val();
    const distSpeedVal = +distSpeed.val();
    const distRetainVal = +distRetain.val();

    const trailsAmountVal = +trailsAmount.val();

    handler({
        imageSizeVal,
        imagePosXVal,
        imagePosYVal,
        imageQualityVal,
        rainAmountVal,
        rainVelocityXVal,
        rainVelocityYVal,
        distRadiusVal,
        distSpeedVal,
        distRetainVal,
        trailsAmountVal
    }, imageUrlLabel);
}

//canvas listeners
export const canvasMouseMove = (handler) => $(canvas).mousemove(handler);
export const canvasMouseLeave = (handler) => $(canvas).mouseleave(handler);

//image box listeners
export const imageSelectionHandler = () => imageRadios.on('click', (e) => {
    if (e.target.type !== 'radio') return;

    if (e.target.dataset.mode === 'file') {
        $('#file-chooser-container').show(300, 'swing');
        $('#url-container').hide(300, 'swing')
    } else {
        $('#file-chooser-container').hide(300, 'swing')
        $('#url-container').show(300, 'swing')
    }
})
export const fileInputHandler = (handler) => imageInput.on('change', handler);
export const imageUrlHandler = (handler) => imageURL.on('change', (e) => handler(e.target.value));
export const imageSizeHandler = (handler) => imageSize.on('input', handler);
export const imagePosXHandler = (handler) => imagePosX.on('input', handler);
export const imagePosYHandler = (handler) => imagePosY.on('input', handler);

//render mode box listeners
export const renderRadiosHandler = (handler) => renderRadios.on('click', (e) => {
    if (e.target.type !== 'radio') return;

    if (e.target.dataset.mode === 'rain') {
        $('#quality-container').hide(300, 'swing', () => {
            $('#rain-box').show();
            $('#rain-container').hide().show(300, 'swing');
            $('#retain-container').hide(300, 'swing');
        });
    } else {
        $('#rain-container').hide(300, 'swing', () => {
            $('#rain-box').hide();
            $('#quality-container').show(300, 'swing');
            $('#retain-container').show(300, 'swing');
        });
    }

    handler(e.target.dataset.mode);
})
export const imageQualityHandler = (handler) => imageQuality.on('input', handler);

//rain box listeners
export const rainRadiosHandler = (handler) => rainRadios.on('click', (e) => {
    if (e.target.type !== 'radio') return;

    if (e.target.dataset.mode === 'full') $('#strips-radios-container').hide(300, 'swing');
    else $('#strips-radios-container').show(300, 'swing');

    handler(e.target.dataset.mode);
})
export const stripsRadiosHandler = (handler) => stripsRadios.on('click', (e) => {
    if (e.target.type !== 'radio') return;
    handler(e.target.dataset.mode);
})
export const rainAmountHandler = (handler) => rainAmount.on('input', handler);
export const rainVelocityXHandler = (handler) => rainVelocityX.on('input', handler);
export const rainVelocityYHandler = (handler) => rainVelocityY.on('input', handler);

//distortion box listeners
export const distRadiosHandler = (handler) => distRadios.on('click', (e) => {
    if(e.target.type !== 'radio') return;

    handler(e.target.dataset.mode);
})
export const distRadiusHandler = (handler) => distRadius.on('input', handler);
export const distSpeedHandler = (handler) => distSpeed.on('input', handler);
export const distRetainHandler = (handler) => distRetain.on('input', handler);

//trails box listeners
//trails listeners
export const showTrailsHandler = (handler) => trailsCheckbox.on('change', (e) => {
    if (e.target.checked) $('#trails-amount-box').removeClass('disable'); else $('#trails-amount-box').addClass('disable')
    handler(e.target.checked);
});
export const trailsAmountHandler = (handler) => trailsAmount.on('input', handler);

export default ctx;
export {canvasWidth, canvasHeight};