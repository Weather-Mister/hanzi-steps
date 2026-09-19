// Own pointer listeners so a lesson can mount/unmount handwriting pads safely.
// Hanzi Writer's rendererOverride is the extension point for this render target.
const ns='http://www.w3.org/2000/svg';
type BoundPointer={getPoint:()=>{x:number;y:number};preventDefault:()=>void};
export function createWriterTarget(host:HTMLElement,width:number,height:number){
 const svg=document.createElementNS(ns,'svg');const defs=document.createElementNS(ns,'defs');svg.append(defs);host.append(svg);
 const remove:(()=>void)[]=[];let active:number|null=null;
 function listen(type:string,fn:(e:PointerEvent)=>void){svg.addEventListener(type,fn as EventListener,{passive:false});remove.push(()=>svg.removeEventListener(type,fn as EventListener))}
 function event(e:PointerEvent):BoundPointer{return {getPoint:()=>{const matrix=svg.getScreenCTM();if(matrix){const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(matrix.inverse());return {x:p.x,y:p.y}}const rect=svg.getBoundingClientRect();return {x:e.clientX-rect.left,y:e.clientY-rect.top}},preventDefault:()=>e.preventDefault()}}
 function target(node:SVGSVGElement|SVGGElement):any{return {node,svg:node,defs,getBoundingClientRect:()=>node.getBoundingClientRect(),updateDimensions:(w:number,h:number)=>{node.setAttribute('width',String(w));node.setAttribute('height',String(h))},createSubRenderTarget:()=>{const group=document.createElementNS(ns,'g');node.append(group);return target(group)},addPointerStartListener:(fn:(e:BoundPointer)=>void)=>listen('pointerdown',e=>{if(e.button!==0||e.isPrimary===false)return;active=e.pointerId;svg.setPointerCapture(e.pointerId);fn(event(e))}),addPointerMoveListener:(fn:(e:BoundPointer)=>void)=>listen('pointermove',e=>{if(active===e.pointerId)fn(event(e))}),addPointerEndListener:(fn:()=>void)=>{const end=(e:PointerEvent)=>{if(active!==e.pointerId)return;active=null;fn()};listen('pointerup',end);listen('pointercancel',end);listen('lostpointercapture',end)}}}
 const root=target(svg);root.updateDimensions(width,height);return {target:root,dispose:()=>{remove.forEach(fn=>fn());svg.remove()}};
}
