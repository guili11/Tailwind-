const lazyImgs=document.querySelectorAll('.pic-lazy');
// 2. 核心判断：图片是否进入可视区域
function isInViewport(img){
    const rect=img.getBoundingClientRect();
    console.log(rect.bottom);
    console.log('window innerHeight:',window.innerHeight);
    //
    return rect.top<=window.innerHeight+300 && rect.bottom>=0;
}
// 3. 图片加载函数
function loadImage(img){
    if(img.classList.contains('loaded'))return;
    const realSrc=img.dataset.src;
    if(realSrc){
        img.src=realSrc;
        img.onload=()=>{
            img.classList.add('loaded');
        }
    }
}
//     自定义节流函数
// function throttle(fn,delay=200){
//     let timer=null;
//     return ()=>{
//         if(!timer){
//             timer=setTimeout(()=>{
//                 fn();
//                 timer=null;
//             },delay);
//         }
//     }
// }
// 使用loadsh的 throttle函数
const throttleFn=_.throttle(initLoad,200,{
    // 第一次事件触发时立即执行
    leading:true,


});

//     5.初始化加载
function initLoad(){
    lazyImgs.forEach(img=>{
        if(isInViewport(img)) {
            loadImage(img);
        }
    })
}
// 6.监听scroll事件，触发检查函数（带有节流）
window.addEventListener('scroll',throttleFn);

// 首次加载就触发一次 initLoad，避免不滚动就不加载
initLoad();
