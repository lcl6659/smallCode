/**
 * dom 操作相关的方法
 */


export function showToast(message) {
  if (document.getElementById('jlglrequesttost')) {
    document.getElementById('jlglrequesttost_content').innerText = message
    document.getElementById('jlglrequesttost').style.opacity = 1
    document.getElementById('jlglrequesttost').style.display = 'flex'
  } else {
    var divDom = document.createElement('div')
    divDom.setAttribute('id', 'jlglrequesttost')
    var style_1 = 'position: fixed;top: 176px;transition: opacity 0.5s;opacity: 0;font-size: 12px;color: white;text-align: center;z-index: 2002;white-space: pre-wrap;overflow-wrap: break-word;display: flex;justify-content: center;align-items: center;box-sizing: border-box;flex-direction: column;text-size-adjust: 100%;width: 100%;left: 0;'
    divDom.setAttribute('style', style_1)

    var divDom2 = document.createElement('div')
    divDom2.setAttribute('id', 'jlglrequesttost_content')
    var style_2 = 'background-color: rgba(0, 0, 0, 0.6);padding: 13px 17px;color: white;display: block;font-size: 12px;line-height: 17px;margin-top: 0;overflow-wrap: break-word;text-align: center;text-size-adjust: 100%;border-radius: 6px;max-width: 70%;min-width: 81px;'
    divDom2.setAttribute('style', style_2)
    divDom2.innerText = message

    divDom.appendChild(divDom2)

    document.body.appendChild(divDom)

    document.getElementById('jlglrequesttost').style.opacity = 1
  }
  
  setTimeout(() => {
    var tDiv = document.getElementById('jlglrequesttost')
    tDiv.style.opacity = 0
    setTimeout(() => {
      var tDiv = document.getElementById('jlglrequesttost')
      tDiv.style.display = 'none'
    }, 500)
  }, 1500)
}


export function showLoading() {
  if (document.getElementById('jlglrequestloading')) {
    document.getElementById('jlglrequestloading').style.display = 'block'
  } else {
    var div_l = document.createElement('div')
    div_l.setAttribute('style', 'padding-top: 30vh; text-align: center;position: fixed;width: 100%;top: 0;left: 0;z-index: 2000;')
    div_l.setAttribute('id', 'jlglrequestloading')

    var img_l = document.createElement('img')
    img_l.setAttribute('src', 'https://gaeacdn.jiliguala.com/jlgl/amway/64812df4fadea6d3bc9ec874818d660f.svg')
    img_l.setAttribute('style', 'width: 60vw')

    div_l.appendChild(img_l)

    document.body.appendChild(div_l)
  }
}

export function hideLoading() {
  if (document.getElementById('jlglrequestloading')) {
    document.getElementById('jlglrequestloading').style.display = 'none'
  }
}