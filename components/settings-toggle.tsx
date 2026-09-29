'use client';

import {Check} from 'lucide-react';

type SettingsToggleProps={
 id:string;
 checked:boolean;
 disabled?:boolean;
 onCheckedChange:(checked:boolean)=>void;
 'aria-label'?:string;
};

export function SettingsToggle({id,checked,disabled=false,onCheckedChange,...aria}:SettingsToggleProps){
 return <button
  id={id}
  type="button"
  role="switch"
  aria-checked={checked}
  disabled={disabled}
  className={`settings-state-toggle ${checked?'is-on':'is-off'}`}
  onClick={()=>onCheckedChange(!checked)}
  {...aria}
 >
  <span className="settings-state-dot" aria-hidden="true">{checked&&<Check size={13} strokeWidth={3}/>}</span>
  <span className="settings-state-label">{checked?'On':'Off'}</span>
 </button>;
}
