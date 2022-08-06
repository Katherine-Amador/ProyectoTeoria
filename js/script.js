const targets = document.querySelectorAll('[data-target]')
const content = document.querySelectorAll('[data-content]')
const content2 = document.querySelectorAll('[data-content2]')

targets.forEach (target => {
    target.addEventListener ('click', () => {

        content.forEach(c => {
            c.classList.remove('active')
        })


        const t = document.querySelector (target.dataset.target)
        t.classList.add('active')
    })
})