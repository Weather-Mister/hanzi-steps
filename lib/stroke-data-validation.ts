export type StrokeGeometry={
 strokes:string[];
 medians:number[][][];
};

function pathBounds(path:string){
 const values=(path.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
 const xs:number[]=[];const ys:number[]=[];
 for(let i=0;i+1<values.length;i+=2){xs.push(values[i]);ys.push(values[i+1])}
 if(!xs.length)return null;
 return {minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys)};
}

/**
 * Reject stroke datasets whose median guidance no longer lines up with the
 * actual stroke paths. A bad median set breaks both handwriting recognition
 * and the dashed "show me the stroke" guide.
 */
export function strokeGeometryLooksAligned(data:StrokeGeometry):boolean{
 if(!data.strokes.length||data.strokes.length!==data.medians.length)return false;
 let total=0,outliers=0;
 for(let i=0;i<data.strokes.length;i++){
  const bounds=pathBounds(data.strokes[i]);
  const median=data.medians[i];
  if(!bounds||!median?.length)return false;
  const margin=80;
  for(const point of median){
   const [x,y]=point;
   if(!Number.isFinite(x)||!Number.isFinite(y))return false;
   total++;
   if(x<bounds.minX-margin||x>bounds.maxX+margin||y<bounds.minY-margin||y>bounds.maxY+margin)outliers++;
  }
 }
 return total>0&&outliers/total<=0.2;
}
