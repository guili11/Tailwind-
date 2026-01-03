<!--    事件委托机制嘛-->
// 这里的js跟上边的是一个作用域，所以这里可以直接使用上边定义的变量

// 2. 点击事件委托（核心逻辑）
gridBox.addEventListener('click', (e) => {

    // 第一步：判断点击的是不是图片（避免点到文本/容器触发）
    const picEl = e.target;
    if (!picEl.classList.contains('pic-lazy')) return; // 只处理图片元素
    // 第二步：获取图片真实地址（兼容懒加载：如果是data-src，取data-src；否则取src）
    const realSrc = picEl.dataset.src || picEl.src;

    // 第三步：创建全屏遮罩层（追加到body）
    const mask = document.createElement('div');
    // 遮罩层样式（Tailwind 类，也可写原生CSS）
    mask.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer';
    mask.style.transition = 'opacity 0.3s ease';

    // 第四步：创建放大的图片元素
    const bigPic = document.createElement('img');
    bigPic.src = realSrc;
    // 放大图片样式：最大宽高90%，居中，加过渡动画
    bigPic.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    min-width: 70vw;
    min-height: 70vh;

    transform: scale(0.95);
    transition: transform 0.3s ease;
  `;

    // 第五步：组装遮罩层+放大图片，追加到body
    mask.appendChild(bigPic);
    document.body.appendChild(mask);

    // 第六步：修复放大动画（先显示遮罩，再放大图片）
    setTimeout(() => {
        bigPic.style.transform = 'scale(1)';
        mask.style.opacity = '1';
    }, 10);

    // 第七步：点击遮罩层关闭放大（事件委托）
    mask.addEventListener('click', () => {
        // 关闭动画：先缩小图片，再移除遮罩
        bigPic.style.transform = 'scale(0.95)';
        mask.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(mask);
        }, 300); // 与过渡时长一致
    });
    // 适配移动端触摸事件
    mask.addEventListener('touchstart',()=>{
        // 关闭动画：先缩小图片，再移除遮罩
        bigPic.style.transform = 'scale(0.95)';
        mask.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(mask);
        }, 300); // 与过渡时长一致
    })

    // 可选：禁止遮罩层内图片的点击冒泡（避免重复触发）
    bigPic.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});