let cursor = 0

const baseFolder = 'images/'
const gallery = [
  'b1.jpg',
  't1.jpg',
  't2.jpg',
]

function next () {
  cursor += 1
  if (cursor === gallery.length) cursor = 0
  setImg(cursor)
}

function prev () {
  cursor -= 1
  if (cursor === -1) cursor = gallery.length - 1
  setImg(cursor)
}

function setImg (index = 0) {
  document.querySelector('.gallery')
    .style.backgroundImage = `url('${baseFolder}${gallery[index]}')`
}

clickHandlers()
next()

function clickHandlers () {
  document.addEventListener('keydown', evt => {
    switch (evt.key) {
      case "ArrowRight":
        return next()
      case "ArrowLeft":
        return prev()
    }
  })

  Array.from(document.querySelectorAll('[data-action]'))
    .forEach(el => el.addEventListener('click', evt => {
      const val = evt.target.getAttribute('data-action')
      switch (val) {
        case 'fullscreen':
          return toggleFullscreen('html')
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

