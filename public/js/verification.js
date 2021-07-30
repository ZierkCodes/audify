let birth_date_input = document.querySelector('#dob')
let social_security_input = document.querySelector('#ssn')
let hidden_social_input = document.querySelector('#hidden_ssn')

birth_date_input.addEventListener('keyup', (e) => {
    // birth_date_input.value = birth_date_input.value.replace(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
    
    if(e.key === 'Enter') { 
        e.preventDefault() 
        return 
    }

    let regchar = new RegExp("^[a-zA-Z]+$");
    if(regchar.test(e.key)) {
        e.preventDefault()
        return
    }

    if(birth_date_input.value.length === 4) {
        birth_date_input.value = birth_date_input.value + '-'
    }

    if(birth_date_input.value.length === 7) {
        birth_date_input.value = birth_date_input.value + '-'
    }
})


let social = []
social_security_input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') { 
        e.preventDefault() 
        return 
    } else if(e.key === 'Backspace') {
        if(social_security_input.value.length === 0) {
            social = []
            return
        }

        social.pop()
        hidden_social_input.value = social.join("")
        console.log(hidden_social_input.value)
    } else if(Number(e.key) === 0 || Number(e.key) === 1 || Number(e.key) === 2 || Number(e.key) === 3 || Number(e.key) === 4 || Number(e.key) === 5 || Number(e.key) === 6 || Number(e.key) === 7 || Number(e.key) === 8 || Number(e.key) === 9) {
        if(social.length < 11) {
            
            social.push(e.key)
            n = 11;
            let val = social_security_input.value

            if(social_security_input.value.length === 3) {
                social.push('-')
                val = social_security_input.value + '–'
                
            }

            if(social_security_input.value.length === 6) {
                social.push('-')
                val = social_security_input.value + '–'
            }

            for(let i = 0; i < val.length; i++) {
                if(i !== '-' && i < 6) {
                    val = val.replace(i, 'X')
                }
            }

            
            hidden_social_input.value = social.join("")
            social_security_input.value = val;
            console.log(hidden_social_input.value)
        }
    }
})

birth_date_input.addEventListener('keydown', (e) => {
    let regchar = new RegExp("^[a-zA-Z]+$");
    console.log(regchar.test(e.key))

    if(e.key === 'Backspace') {
        return;
    }

    if(regchar.test(e.key)) {
        console.log("IT'S A LETTER!")
        e.preventDefault()
        e.stopPropagation()
        return
    }
})

social_security_input.addEventListener('keydown', (e) => {
    let regchar = new RegExp("^[a-zA-Z]");
    console.log(regchar.test(e.key))
    if(e.key === 'Backspace') {
        return;
    }

    if(regchar.test(e.key)) {
        console.log("IT'S A LETTER!")
        e.preventDefault()
        e.stopPropagation()
        return
    }
})


String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}