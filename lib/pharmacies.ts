export const institutions = ['Allianz','Türkiye Sigorta','AXA','Anadolu Sigorta','İş Bankası Emekli Sandığı'];
export const districts = ['Balçova','Konak','Karabağlar'];
export type Method = 'chamber'|'field'|'phone'|'self_claimed'|'scraped';
export type Facility = { id:string; facility_type:'pharmacy'; status:'active'|'temporarily_closed'|'closed'; name:string; area:string; address:string; district:string; region:string; lat:number; lon:number; open:boolean; duty:boolean; whatsapp_active:boolean; agreements:{institution:string; verification_method:Method; verified_at:string}[]; demo:true };
const make=(id:number,name:string,area:string,district:string,region:string,lat:number,lon:number,open:boolean,duty:boolean,names:string[],method:Method='field',date='2026-09-10'):Facility=>({id:`demo-${id}`,facility_type:'pharmacy',status:'active',name,area,address:`Örnek Sokak No: ${id*8+4}/A`,district,region,lat,lon,open,duty,whatsapp_active:false,agreements:names.map(institution=>({institution,verification_method:method,verified_at:date})),demo:true});
export const facilities:Facility[]=[
 make(1,'Kıyı Eczanesi','Bahçelerarası Mahallesi','Balçova','Balçova-1',38.391,27.048,true,false,['Allianz','Türkiye Sigorta','AXA']),
 make(2,'Defne Eczanesi','Eğitim Mahallesi','Balçova','Balçova-1',38.390,27.055,true,true,['Allianz','Anadolu Sigorta'],'phone','2026-09-08'),
 make(3,'Mavi Eczanesi','Teleferik Mahallesi','Balçova','Balçova-2',38.385,27.060,true,false,['Allianz','AXA'],'field','2026-09-06'),
 make(4,'Çınar Eczanesi','Korutürk Mahallesi','Balçova','Balçova-2',38.382,27.045,false,false,['Allianz','Türkiye Sigorta'],'phone','2026-06-02'),
 make(5,'Ada Eczanesi','Mithatpaşa Mahallesi','Konak','Mithatpaşa',38.410,27.100,true,true,['Allianz','AXA','İş Bankası Emekli Sandığı']),
 make(6,'Işık Eczanesi','Güzelyalı Mahallesi','Konak','Mithatpaşa',38.400,27.085,true,false,['Türkiye Sigorta','Anadolu Sigorta'],'phone'),
 make(7,'Filiz Eczanesi','Hatay Mahallesi','Karabağlar','Hatay',38.393,27.113,true,false,['Allianz','Türkiye Sigorta']),
 make(8,'Duru Eczanesi','Bahçelievler Mahallesi','Karabağlar','Üçyol',38.397,27.125,true,true,['AXA','Anadolu Sigorta']),
 make(9,'Ufuk Eczanesi','Eğitim Mahallesi','Balçova','Balçova-1',38.389,27.056,true,false,['Allianz'],'scraped'),
 {...make(10,'Kapalı Örnek Eczane','Eğitim Mahallesi','Balçova','Balçova-1',38.387,27.053,true,true,['Allianz']),status:'temporarily_closed'}
];
export type SearchInput={institution:string;district:string;query?:string;onlyOpen?:boolean;freshOnly?:boolean;dutyOnly?:boolean;sort?:'recommended'|'name';location?:{latitude:number;longitude:number}};
export type Result=Facility & {verified_at:string;verification_method:Method;fresh:boolean;distance?:number;walkingMinutes?:number};
export function normalize(value:string){return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');}
export function isFresh(date:string,now=Date.now()){const age=now-Date.parse(date+'T00:00:00Z');return age>=0&&age<=60*86400000;}
export function distanceKm(a:{latitude:number;longitude:number},b:Facility){const rad=Math.PI/180;const dLat=(b.lat-a.latitude)*rad,dLon=(b.lon-a.longitude)*rad;const n=Math.sin(dLat/2)**2+Math.cos(a.latitude*rad)*Math.cos(b.lat*rad)*Math.sin(dLon/2)**2;return 6371*2*Math.atan2(Math.sqrt(n),Math.sqrt(1-n));}
export function searchPharmacies(input:SearchInput,now=Date.now()):Result[]{
 return facilities.filter(p=>p.facility_type==='pharmacy'&&p.status==='active'&&(!input.location?p.district===input.district:true)&&(!input.onlyOpen||p.open)&&(!input.dutyOnly||p.duty)&&normalize(p.name+' '+p.area).includes(normalize(input.query||''))).flatMap(p=>{
 const agreement=p.agreements.find(a=>a.institution===input.institution&&a.verification_method!=='scraped');if(!agreement)return [];
 const fresh=isFresh(agreement.verified_at,now);if(input.freshOnly&&!fresh)return [];
 const distance=input.location?distanceKm(input.location,p):undefined;
 return [{...p,agreements:p.agreements.filter(a=>a.verification_method!=='scraped'),verified_at:agreement.verified_at,verification_method:agreement.verification_method,fresh,distance,walkingMinutes:distance===undefined?undefined:Math.max(1,Math.round(distance/4.5*60))}];
 }).sort((a,b)=>input.sort==='name'?a.name.localeCompare(b.name,'tr'):Number(b.open)-Number(a.open)||(a.distance??0)-(b.distance??0));
}
