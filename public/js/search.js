let channels_array = document.querySelectorAll('.channel_item')
let search_input = document.querySelector('#search_channels')

search_input.addEventListener('keyup', (e) => {
    channels_array.forEach((channel) => {
        if(channel.dataset.channel.includes(search_input.value)) {
            channel.style.display = 'flex'
        } else {
            channel.style.display = 'none'
        }
    })
})