/*
    工具
*/

// 和 UA 相关的属性
export const UA = {
    _ua: navigator.userAgent,

    // 是否 webkit
    isWebkit: function () {
        const reg = /webkit/i
        return reg.test(this._ua)
    },

    // 是否 IE
    isIE: function () {
        return 'ActiveXObject' in window
    }
}

// 遍历对象
export function objForEach(obj, fn) {
    let key, result
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            result = fn.call(obj, key, obj[key])
            if (result === false) {
                break
            }
        }
    }
}

// 遍历类数组
export function arrForEach(fakeArr, fn) {
    let i, item, result
    const length = fakeArr.length || 0
    for (i = 0; i < length; i++) {
        item = fakeArr[i]
        result = fn.call(fakeArr, item, i)
        if (result === false) {
            break
        }
    }
}

// 获取随机数
export function getRandom(prefix) {
    return prefix + Math.random().toString().slice(2)
}

// 替换 html 特殊字符
export function replaceHtmlSymbol(html) {
    if (html == null) {
        return ''
    }
    return html.replace(/</gm, '&lt;')
                .replace(/>/gm, '&gt;')
                .replace(/"/gm, '&quot;')
}

// 返回百分比的格式
export function percentFormat(number) {
    number = (parseInt(number * 100))
    return number + '%'
}

//XmlHttpRequest对象      
function createXmlHttpRequest(){      
    //if(window.ActiveXObject){ //如果是IE浏览器      
    //    return new ActiveXObject('Microsoft.XMLHTTP')
    //}else if(window.XMLHttpRequest){ //非IE浏览器      
    return new XMLHttpRequest()
    //}      
}  

// 请求ajax
export function ajax(options){

    options = options||{
        type: 'GET'
    }

    var xmlHttpRequest = createXmlHttpRequest()
    xmlHttpRequest.open(options.type, options.url, true)
    xmlHttpRequest.onreadystatechange = function(){  
        if(xmlHttpRequest.readyState == 4){  
            if(xmlHttpRequest.status == 200){  
                options.success && options.success(xmlHttpRequest.responseText)
            }else{  
                options.error && options.error()
            }  
        }  
    }

    xmlHttpRequest.send(options.data)
}