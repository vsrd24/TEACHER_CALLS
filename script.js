const teachers=[
{id:'T1001',name:'Dr Alfred'},
{id:'T1002',name:'Dr Jekin'},
{id:'T1003',name:'Dr John Paul'},
{id:'T1004',name:'Dr Dolly'}
];

const students=[];
for(let i=1;i<=20;i++)students.push({number:(1000+i).toString()});

let currentTeacher=null,currentStudent=null;

function loginTeacher(){
const id=document.getElementById('teacherId').value;
const t=teachers.find(x=>x.id===id);
if(!t)return document.getElementById('teacherMsg').innerText='Invalid ID';
currentTeacher=t;
teacherLogin.style.display='none';
teacherPanel.style.display='block';
teacherName.innerText=t.name;
}

function logoutTeacher(){
currentTeacher=null;
teacherLogin.style.display='block';
teacherPanel.style.display='none';
}

function callAll(){students.forEach(s=>sendAlert(s.number));}

function callOne(){
const last4=studentLast4.value;
const s=students.find(x=>x.number.endsWith(last4));
if(s)sendAlert(s.number);
}

function clearCalls(){localStorage.removeItem('alerts');alert('Cleared');}

function loginStudent(){
const n=studentNumber.value;
if(!students.find(x=>x.number===n))return studentMsg.innerText='Invalid';
currentStudent=n;
studentLogin.style.display='none';
studentPanel.style.display='block';
Notification.requestPermission();
loadAlerts();
}

function logoutStudent(){
currentStudent=null;
studentLogin.style.display='block';
studentPanel.style.display='none';
}

function sendAlert(stu){
const alerts=JSON.parse(localStorage.getItem('alerts')||'[]');
alerts.push({teacher:currentTeacher.name,student:stu,time:new Date().toLocaleTimeString()});
localStorage.setItem('alerts',JSON.stringify(alerts));
if(stu===currentStudent)popup(currentTeacher.name);
}

function popup(t){
sound.play();
if(Notification.permission==='granted')new Notification('Campus Alert',{body:t+' called you'});
const p=document.createElement('div');
p.className='popup';
p.innerText=t+' called you';
popupContainer.appendChild(p);
setTimeout(()=>p.remove(),5000);
}

function loadAlerts(){
const alerts=JSON.parse(localStorage.getItem('alerts')||'[]').filter(a=>a.student===currentStudent);
alertBox.innerHTML=alerts.map(a=>a.teacher+' at '+a.time).join('<br>')||'No alerts';
}

window.addEventListener('storage',loadAlerts);
