let profile_image = document.querySelector('#my-profile-image')
let settings = document.querySelector('#settings')

if(profile_image && settings) {
    profile_image.addEventListener('click', () => {
        settings.classList.toggle('open')
    })
}

window.addEventListener('click', function(e) {
    if(settings.classList.contains('open') && e.target.id !== 'my-profile-image') {
        settings.classList.toggle('open');
    }
});