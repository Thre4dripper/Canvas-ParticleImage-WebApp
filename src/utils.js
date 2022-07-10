export const toDataURL = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function () {
        callback("Error");
    }
    xhr.send();
}

export const encodeImageFileAsURL = (element, callback) => {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result);
    }
    reader.onerror = function () {
        callback("Error");
    }
    reader.readAsDataURL(file);
}

export const showLoading = (label) => {
    label.show('slow')
    label.removeClass('text-green-500')
    label.removeClass('text-red-500')
    label.text('Loading...')
}

export const showSuccess = (label) => {
    label.show('slow',);
    label.removeClass('text-red-500')
    label.addClass('text-green-500')
    label.text('Loaded');
}

export const showError = (label) => {
    setTimeout(() => {
        label.hide('slow',);
    }, 2000);
    label.text('Error Loading Image or Invalid URL');
    label.show('slow',);
    label.removeClass('text-green-500')
    label.addClass('text-red-500')
}