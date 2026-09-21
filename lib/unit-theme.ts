export const unitVisualThemes=[
  'blue','teal','plum','amber','rose','indigo','cyan','orange',
  'emerald','violet','coral','sky','gold','magenta','forest','cherry',
] as const;

export type UnitVisualTheme=(typeof unitVisualThemes)[number];

export function visualUnitTheme(unit:{number:number},bookNumber=1):UnitVisualTheme{
  const bookOffset=Math.max(0,bookNumber-1)*8;
  const index=(Math.max(1,unit.number)-1+bookOffset)%unitVisualThemes.length;
  return unitVisualThemes[index];
}
