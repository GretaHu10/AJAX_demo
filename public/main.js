console.log('我是main.js')

// 加载CSS      用 onreadystatechange 改写 onload 和 onerror
getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "/style.css")  // readyState = 1
    request.onreadystatechange = () => {
        // 下载完成，但不知道是成功 2XX  还是失败 4XX 5XX 
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const style = document.createElement('style')
                style.innerHTML = request.response
                document.head.appendChild(style)
            } else {
                alert('加载 CSS 失败')
            }
        }
    }
    request.send()   // readyState = 2
}


// 加载 JS 
getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "/2.js")
    request.onload = () => {
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
    }
    request.onerror = () => {
        console.log("失败了")
    }
    request.send()
}

// 加载 HTML
getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "3.html")
    request.onload = () => {
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)

    }
    request.onerror = () => {
        console.log("失败了")
    }
    request.send()
}


// 加载XML
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "/4.xml")
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const dom = request.responseXML
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim())
            } else {
                alert('加载 XML 失败')
            }
        }
    }
    request.send()
}


// 加载 JSON 用户名字
getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "/5.json")
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                console.log(request.response)
                const object = JSON.parse(request.response)
                myName.textContent = object.name
            }
        }
    }
    request.send()
}


// 加载分页
let n = 1
getPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", `/page${n + 1}`)
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response)
            const array = JSON.parse(request.response)
            array.forEach(item => {
                const li = document.createElement("li")
                li.textContent = item.id
                xxx.appendChild(li)
            });
            n += 1
        }
    }
    request.send()
}