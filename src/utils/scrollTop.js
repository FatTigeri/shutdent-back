// 导出判断页面滚动条位置方法
export function scrollTop(element) {
    // 获取滚动条当前的位置
    const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset

    // 当滚动条位置大于等于200时将返顶按钮显示
    if (top >= 200) {
        document.querySelector('' + element).style.display = 'block'
    } else {
        // 当滚动条位置小于200时将返顶按钮隐藏
        document.querySelector('' + element).style.display = 'none'
    }
}

// 导出设置页面滚动条为零的方法
export function toTop() {
    // 将页面进行返顶操作
    document.documentElement.scrollTop = 0
}