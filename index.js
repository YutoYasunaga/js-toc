import './style.scss'

Element.prototype.toc = function(options = {}) {
  const defaultOptions = {
    tocSelector: '#toc',
    tocIndent: true,
    smooth: true,
  }
  options = { ...defaultOptions, ...options }

  // ===== ADD TABLE OF CONTENTS =====
  const tocContainer = document.querySelector(options.tocSelector)
  const headings = this.querySelectorAll('h1, h2, h3, h4, h5, h6')
  if (headings.length === 0) return
  
  const startingLevel = headings[0].tagName[1]
  const toc = document.createElement('ul')
  const prevLevels = [0, 0, 0, 0, 0, 0]
  
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const level = parseInt(heading.tagName[1])
  
    prevLevels[level - 1]++
    for (let j = level; j < prevLevels.length; j++) {
      prevLevels[j] = 0
    }

    const sectionNumber = prevLevels.slice(startingLevel - 1, level).join('.').replace(/\.0/g, "")
    const newHeadingId = `${heading.textContent.toLowerCase().replace(/ /g, '-')}`
    heading.id = newHeadingId

    const anchor = document.createElement('a')
    anchor.setAttribute('href', `#${newHeadingId}`)
    anchor.textContent = heading.textContent

    anchor.addEventListener('click', (event) => {
      event.preventDefault()
      const targetId = event.target.getAttribute('href').slice(1)
      const targetElement = document.getElementById(targetId)
      targetElement.scrollIntoView({ behavior: options.smooth ? 'smooth' : 'auto' })
      history.pushState(null, null, `#${targetId}`);
    })

    const listItem = document.createElement('li')
    listItem.textContent = sectionNumber
    listItem.appendChild(anchor)

    listItem.classList.add('toc-item')
    if (options.tocIndent) {
      const className = `toc-${heading.tagName.toLowerCase()}`
      listItem.classList.add(className)
    }

    toc.appendChild(listItem)
  }
  
  tocContainer.appendChild(toc);
  
  // ===== DETECT CURRENT TOC ITEM =====
  window.addEventListener('scroll', function() {
    let scroll = window.scrollY
    let height = window.innerHeight
    let offset = 200
  
    headings.forEach(function (heading, index) {
      let i = index + 1;
      let target = document.querySelector('#toc li:nth-of-type(' + i + ') > a');
      let pos = heading.getBoundingClientRect().top + scroll
      if (!target) return
  
      if (scroll > pos - height + offset) {
        if (headings[index + 1] !== undefined) {
          let next_pos = headings[index + 1].getBoundingClientRect().top + scroll
          if (scroll > next_pos - height + offset) {
            target.classList.remove('toc-active')
          } else if (i === 1 && tocContainer.classList.contains('active') === false) {
            target.classList.add('toc-active')
            tocContainer.classList.add('active')
          } else { 
            target.classList.add('toc-active')
          }
        } else {
          target.classList.add('toc-active')
        }
      } else {
        target.classList.remove('toc-active')
        if (i === 1 && tocContainer.classList.contains('active')) {
          tocContainer.classList.remove('active')
        }
      }
    })
  })
  
  // ===== SCROLL TO CURRENT ANCHOR WHEN PAGE LOADED =====
  if (window.location.hash) {
    const anchorId = decodeURIComponent(window.location.hash.slice(1));
    const anchorElement = document.getElementById(anchorId);
  
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: options.smooth ? 'smooth' : 'auto' })
    }
  }
}