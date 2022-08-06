const targets = document.querySelectorAll('[data-target]')
const content = document.querySelectorAll('[data-content]')


targets.forEach (target => {
    target.addEventListener ('click', () => {

        content.forEach(c => {
            c.classList.remove('active')
            c.classList.remove('enviar')
        })


        const t = document.querySelector (target.dataset.target)
        t.classList.add('active')
        t.classList.add('enviar')
    })
})

