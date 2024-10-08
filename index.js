import './style.min.css'

Element.prototype.toc = function(options = {}) {
  console.log('Initialize TOC')

  const defaultOptions = {
    tocSelector: '#toc',
    maxHeight: '75vh',
    activeClass: 'js-toc-active',
    autoOpen: true,
    tocIndent: true,
    tocNumber: true,
    smoothScroll: true,
  }
  options = { ...defaultOptions, ...options }

  const tocContainer = document.querySelector(options.tocSelector)

  // Add default toc title if not exists
  if (!tocContainer.querySelector('.js-toc-title')) {
    const tocTitle = document.createElement('div')
    tocTitle.classList.add('js-toc-title')
    tocTitle.textContent = 'Table of Contents'
    tocContainer.appendChild(tocTitle)
  }

  // ===== ADD TABLE OF CONTENTS =====
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
      targetElement.scrollIntoView({ behavior: options.smoothScroll ? 'smooth' : 'auto' })
      history.pushState(null, null, `#${targetId}`)
    })

    const listItem = document.createElement('li')
    if (options.tocNumber) listItem.textContent = sectionNumber
    listItem.appendChild(anchor)

    listItem.classList.add('js-toc-item')
    if (options.tocIndent) {
      const className = `js-toc-${heading.tagName.toLowerCase()}`
      listItem.classList.add(className)
    }

    toc.appendChild(listItem)
  }

  var tocContent = document.createElement('div')
  tocContent.classList.add('js-toc-content')
  tocContent.style.maxHeight = options.maxHeight
  tocContainer.appendChild(tocContent)
  tocContent.appendChild(toc)
  tocContent.style.height = tocContent.scrollHeight + 'px'
  
  // ===== TOGGLE COLLAPSE =====
  var toggleButton = document.createElement("div")
  toggleButton.classList.add('chevron-down')
  toggleButton.id = "tocContentToggle"
  tocContainer.appendChild(toggleButton)

  if (!options.autoOpen) closeTOC()

  toggleButton.addEventListener("click", function() {
    if (isOpen()) {
      closeTOC()
    } else {
      openTOC()
    }
  })

  // ===== DETECT CURRENT TOC ITEM =====
  window.addEventListener('scroll', function() {
    let scroll = window.scrollY
    let height = window.innerHeight
    let offset = 200
  
    headings.forEach(function (heading, index) {
      let i = index + 1;
      let target = document.querySelector('#toc li:nth-of-type(' + i + ')');
      let pos = heading.getBoundingClientRect().top + scroll
      if (!target) return
  
      if (scroll > pos - height + offset) {
        if (headings[index + 1] !== undefined) {
          let next_pos = headings[index + 1].getBoundingClientRect().top + scroll
          if (scroll > next_pos - height + offset) {
            target.classList.remove(options.activeClass)
          } else if (i === 1 && tocContainer.classList.contains('active') === false) {
            target.classList.add(options.activeClass)
            tocContainer.classList.add('active')
          } else { 
            target.classList.add(options.activeClass)
          }
        } else {
          target.classList.add(options.activeClass)
        }
      } else {
        target.classList.remove(options.activeClass)
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
      anchorElement.scrollIntoView({ behavior: options.smoothScroll ? 'smooth' : 'auto' })
    }
  }

  function closeTOC() {
    tocContent.style.height = '0px'
    toggleButton.classList.remove('chevron-down')
    toggleButton.classList.add('chevron-left') 
  }

  function openTOC() {
    tocContent.style.height = tocContent.scrollHeight + 'px'
    toggleButton.classList.remove('chevron-left')
    toggleButton.classList.add('chevron-down')
  }

  function isOpen() {
    return tocContent.style.height !== '0px'
  }
}