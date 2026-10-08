export const unitVisualThemes=[
  'blue','teal','plum','amber','rose','indigo','cyan','orange',
  'emerald','violet','coral','sky','gold','magenta','forest','cherry',
] as const;

export type UnitVisualTheme=(typeof unitVisualThemes)[number];

export function visualUnitTheme(unit:{number:number;id?:string;theme?:UnitVisualTheme},bookNumber=1):UnitVisualTheme{
  if(unit.id?.startsWith('extra-')&&unit.theme)return unit.theme;
  const bookOffset=Math.max(0,bookNumber-1)*8;
  const index=(Math.max(1,unit.number)-1+bookOffset)%unitVisualThemes.length;
  return unitVisualThemes[index];
}

