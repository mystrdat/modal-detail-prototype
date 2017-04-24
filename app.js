function runTheShow () {
  console.log('beep!');

  // DOM
  var sources = document.querySelectorAll('#source li'),
      clones = document.getElementById('clones'),
      detail = document.getElementById('detail');

  // Helpers

  function getClone (el) {
    console.log('creating clone:', el);
    var elBounds = el.getBoundingClientRect(),
        clone = el.cloneNode(true);
    clone.setAttribute('style', window.getComputedStyle(el).cssText);
    clone.style.position = 'absolute';
    clone.style.zIndex = 10000;
    clone.style.left = elBounds.left - 20 + 'px';
    clone.style.top = elBounds.top - 20 + 'px';
    clone.style.margin = 0;
    clone.style.opacity = 1;
    clone.style.transition = 'all 300ms ease-out';
    return clone;
  }

  function fadeThumbnails () {
    console.log('fading sources');
    sources.forEach(function (source) {
      source.classList.add('fade');
    })
  }

  function setDetailType (type) {
    detail.removeAttribute('class');
    detail.classList.add(type);
  }

  function syncScrollAreas () {
    document.querySelector('#detail .list').scrollLeft = document.getElementById('source').scrollLeft;
  }

  function showDetailWrapper () {
    detail.classList.add('in');
  }

  function swapCloneList () {
    document.querySelectorAll('#detail li').forEach(function (result) {
      result.classList.remove('fade');
    })
    clones.innerHTML = '';
  }

  function morphIntoThumbnails (el) {
    console.log('morphing into thumbnails');
    sources.forEach(function (source) {
      var target = document.querySelector('.' + source.getAttribute('data-target')),
          targetBounds = target.getBoundingClientRect(),
          sourceBounds = source.getBoundingClientRect(),
          clone = getClone(source);
      clone.classList.add('clone');
      clones.appendChild(clone);
      setTimeout(function () {
        clone.style.transform = 'translate(' + (targetBounds.left - sourceBounds.left) + 'px,' + (targetBounds.top - sourceBounds.top) + 'px)';
      }, 0)
    })
  }


  function openDetail (source, type) {
    console.log('showing ' + type + ' detail for:', source)
    // Set detail wrapper type
    if (type) {
      setDetailType(type);
    }
    // Sync scroll area
    syncScrollAreas();
    // Highlight current and fade siblings
    fadeThumbnails();
    // Animate thumbs to detail location
    morphIntoThumbnails();
    // Fade in detail wrapper
    showDetailWrapper();
    // Swap clones for real list
    setTimeout(function () {
      swapCloneList();
    }, 600)
  }

  // Roll this fucker
  sources.forEach(function (source) {
    source.addEventListener('click', function () {
      //openDetail(source, 'vertical');
      openDetail(source);
    })
  })
}

document.addEventListener('DOMContentLoaded', runTheShow, false);
