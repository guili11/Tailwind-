const picData={imgUrl:"https://picsum.photos/600/400?random=",text:"画廊示例图"};
const picNum=100;
const galleryData=[];
for(let i=0;i<picNum;i++){
    const temp={...picData};
    temp.imgUrl=temp.imgUrl+(i+1);
    temp.text="画廊示例图"+(i+1);
    galleryData.push(temp);
}
const fragment=document.createDocumentFragment();
galleryData.forEach(item=>{
    const div=document.createElement("div");
    div.classList.add('pic-box');
    const img=document.createElement("img");
    img.classList.add('pic-lazy');
    img.dataset.src=item.imgUrl;
    img.alt=item.text;
    const p=document.createElement("p");
    p.classList.add('pic-text');
    p.textContent=item.text;
    // 给每个盒子组装起来
    div.append(img);
    div.append(p);
    //     准备结束，添加到fragment中，
    fragment.append(div);
})

//     一次性添加到html中，减少dom操作，减少回流
const gridBox=document.querySelector('#grid-box');
gridBox.append(fragment);