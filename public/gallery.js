let cursor = -1

const baseFolder = 'images/'

function reset() {
  cursor = 0
  setImg(cursor)
}

function next () {
  cursor += 1
  if (cursor === gallery.length) cursor = 0
  setImg(cursor)

  // if (cursor === 1) {
    // document.querySelector(`[data-role="intro-text"]`).classList.add('hide')
  // }

  const preloadLink = document.createElement('link')
  preloadLink.href = `${baseFolder}${gallery[cursor+1]}`
  preloadLink.rel = 'preload'
  preloadLink.as = 'image'
  if (!document.querySelector(`link[preload="${preloadLink.getAttribute('href')}"]`)) {
    document.head.appendChild(preloadLink)
  }
}

function prev () {
  cursor -= 1
  if (cursor === -1) cursor = gallery.length - 1
  setImg(cursor)
}

function setImg (index) {
  document.querySelector('.gallery')
    .style.backgroundImage = `url('${baseFolder}${gallery[index]}')`
}

document.addEventListener('keydown', evt => {
  switch (evt.key) {
    case "ArrowRight":
      return next()
    case "ArrowLeft":
      return prev()
  }
})
clickHandlers()
reset()

function clickHandlers () {
  Array.from(document.querySelectorAll('[data-action]'))
    .forEach(el => el.addEventListener('click', evt => {
      evt.stopPropagation()
      const val = el.getAttribute('data-action')
      switch (val) {
        case 'fullscreen':
          return toggleFullscreen('html')
        case null:
          return console.debug(val, 'didnt do anything')
        default:
          return window[val]()
      }
    }))
}

function toggleFullscreen (sel) {
  let elem = document.querySelector(sel)
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      console.warn(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
    })
  } else {
    document.exitFullscreen()
  }
}

