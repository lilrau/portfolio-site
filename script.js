class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu)
        this.navList = document.querySelector(navList)
        this.navLinks = document.querySelectorAll(navLinks)
        this.activeClass = "active"

        this.handleClick = this.handleClick.bind(this)
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation ?
                (link.style.animation = "") :
                (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`)

        })
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass)
        this.mobileMenu.classList.toggle(this.activeClass)
        this.animateLinks()
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick)
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent()
        }
        return this
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
)
mobileNavbar.init()

const menuItems = document.querySelectorAll('.menu a[href^="#"')

menuItems.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick)
})

function getScrollTopbyHref(element) {
    const id = element.getAttribute('href')
    const to = document.querySelector(id)
    var offset = to.getBoundingClientRect()
    return offset.top
}

function scrollToIdOnClick(event) {
    event.preventDefault()
    const dist = getScrollTopbyHref(event.target) - 90
    smoothScrollTo(0, dist)
}

function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset
    const startY = window.scrollY || window.pageYOffset
    const distanceX = endX - startX
    const distanceY = endY - startY
    const startTime = new Date().getTime()

    duration = typeof duration !== 'undefined' ? duration : 700

    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from
    }

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime
        const newX = easeInOutQuart(time, startX, distanceX, duration)
        const newY = easeInOutQuart(time, startY, distanceY, duration)
        if (time >= duration) {
            clearInterval(timer)
        }
        window.scroll(newX, newY)
    }, 1000 / 60)
}

let progress = document.getElementById('progressbar')
let totalHeight = document.body.scrollHeight - window.innerHeight
window.onscroll = function () {
    let progressHeight = (window.pageYOffset / totalHeight) * 100
    progress.style.height = progressHeight + "%"
}