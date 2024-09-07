# js-toc

A JavaScript plugin that automatically creates a dynamic, SEO-friendly table of contents from headings in a document.

**js-toc** offers a suite of powerful features designed to enhance your documentation and articles:
- 📑 **Dynamic Table of Contents**: Automatically generates a fully functional table of contents based on your document's headings.
- 🌐 **SEO Friendly**: Adds anchor links to improve navigation and optimize SEO.
- 🧭 **Smooth Scrolling**: Smoothly scrolls to sections, including automatic scrolling to the current anchor when the page is loaded.
- 🔢 **Automatic Numbering**: Automatically assigns hierarchical numbers to sections, enhancing clarity.
- 📐 **Optional Indentation**: Customizable indentation levels to reflect the structure of your document visually.
- ♿ **Enhanced Accessibility**: Improves accessibility by providing a clear structure for easier navigation.
- 💼 **Professional Look**: Gives your content a professional, organized appearance, enhancing usability.
- 📂 **Collapsible Sections**: Features an easy-to-use toggle to collapse or expand the table of contents, making large documents more manageable.
- 📏 **Customizable Options**: Easily customize various features such as TOC height, numbering, indentation, and more for greater flexibility and control.

![js-toc](./screenshot.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [In HTML file](#in-html-file)
    - [In JS file](#in-js-file)
- [Options](#options)
- [License](#license)

## Installation

Install using npm:
```
npm install js-toc
```

Install using yarn:
```
yarn add js-toc
```

## Usage

### In HTML file
```html
<!-- Add this where you want the table of contents to appear -->
<div id="toc" class="toc-container">
    <div class="toc-title">Table of Contents</div>
</div>
```

### In JS file
```js
// Import the plugin
import 'js-toc'

// Initialize the table of contents
document.querySelector('article').toc({
  tocSelector: '#toc',
  tocIndent: true,
  tocNumber: true,
  smooth: true,
  maxHeight: '70vh',
})
```

## Options
You can customize the behavior of the table of contents by passing an options object to the toc() method. The following options are available:

| Option          | Default               | Description                                                                                       |
|-----------------|-----------------------|---------------------------------------------------------------------------------------------------|
| `tocSelector`   | `'#toc'`              | Specifies the selector for the container where the table of contents will be rendered.             |
| `maxHeight`     | `'75vh'`              | Sets the maximum height for the TOC container, making it scrollable if the content exceeds the height. |
| `activeClass`   | `'js-toc-active'`     | Specifies the class name for the currently active TOC item as the user scrolls through the document. |
| `tocIndent`     | `true`                | Indents the TOC items based on their heading levels.                                               |
| `tocNumber`     | `true`                | Automatically adds numbers to each TOC item according to its hierarchy.                            |
| `smoothScroll`  | `true`                | Enables smooth scrolling to the clicked TOC item.                                                  |
| `autoOpen`      | `true`                | Automatically opens the TOC on page load. If set to `false`, the TOC will start in a collapsed state. |


## Use with Ruby on Rails and turbo-rails

When using `js-toc` with Ruby on Rails and Turbo Drive, ensure that the plugin initializes properly after each Turbo Drive navigation. The following JavaScript snippet ensures that the table of contents is set up once Turbo Drive loads new content without adding multiple listeners:

```js
javascript:
  // Ensure isListenerAdded is only declared once at a global scope
  window.isListenerAdded = window.isListenerAdded || false;

  if (!window.isListenerAdded) {
      document.addEventListener('turbo:load', () => {
          document.querySelector('article')?.toc();
      });
      window.isListenerAdded = true;
  }
```

## License
This library is licensed under the MIT License.
