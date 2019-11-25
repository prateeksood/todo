const form=document.querySelector('form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

loadEventListeners();


function loadEventListeners(){
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
    document.addEventListener('DOMContentLoaded',getTasks);
}
function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(
        function(task){
            const li=document.createElement('li');
            li.className='collection-item';
            li.appendChild(document.createTextNode(task));
            const link =document.createElement('a');
            link.className='delete-item';
            link.innerHTML='<i class="fas fa-times"></i>';
            li.appendChild(link);
            taskList.append(li);
        }
    )
}
function addTask(e)
{
    if(taskInput.value==='')
    {
        alert("Add a Task");
    }
    else
    {
        const li=document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link =document.createElement('a');
        link.className='delete-item';
        link.innerHTML='<i class="fas fa-times"></i>';
        li.appendChild(link);
        taskList.append(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value="";
        
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?'))
            e.target.parentElement.parentElement.remove();
            let tasks;
            if(localStorage.getItem('tasks')===null){
                tasks=[];
            }else{
                tasks=JSON.parse(localStorage.getItem('tasks'));
            }
            tasks.forEach(
                function(task)
                {
                    if(e.target.parentElement.parentElement.textContent===task){
                        tasks.pop(task);
                    }
                }
            )
            localStorage.setItem('tasks',JSON.stringify(tasks));
    }
}

function clearTasks(){
   if(confirm("Are you sure?")){
        while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
   }
}

function filterTasks(e)
{
   const text=filter.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(
       function(task)
       {
           if(task.textContent.toLowerCase().indexOf(text)!==-1)
           {
               task.style.display='flex';
           }
           else{
               task.style.display='none';
           }
       }
   )


}