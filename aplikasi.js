const form      = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-task');
const filter    = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', ambilTugas);

    // form/taskList adalah variable di atas | addEventListener adalah memilih event
    form.addEventListener('submit' , addTask);
    taskList.addEventListener('click', removeTask); //membuat function remove task
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTask);
}

function ambilTugas(){
    let tasks;

    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li     = document.createElement('li');

        li.className = 'collection-item';
    
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement('a');
    
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
    
        li.appendChild(link);
    
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === ''){
        alert('data berhasil disimpan');
    }


    const li     = document.createElement('li');

    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    simpanData(taskInput.value);

    taskInput.value ='';

    e.preventDefault();
}

function simpanData(task){
    let tasks;
    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task); //push untuk memasukan nilai ke dalam sebuah array

    localStorage.setItem('tasks', JSON.stringify(tasks)); //sringfy untuk mengubah objek menjadi json pada javascript,objek ini dpt berupa array maupun objek
}

function removeTask(e)
{
    if (e.target.parentElement.classList.contains('delete-item')){ //notifikasi
        if(confirm('apakah anda yakin ingin hapus datanya !')){
            e.target.parentElement.parentElement.remove();
        }
    }

    hapusDataLocal(e.target.parentElement.parentElement);
}

function hapusDataLocal(taskItem){
    let tasks;
    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e)
{
    while(taskList.firstChild){ // melooping taskList yg ada dengan while dan firstChild adalah untuk mengembalikan nilai yg pertama 
        taskList.removeChild(taskList.firstChild); //remove untuk menghapus semua datanya, kita looping dlu lalu kita hapus semua
    }

    hapusDataSemua();
}

function hapusDataSemua(){
    localStorage.clear();
}

function filterTask(e)
{
    const text = e.target.value.toLowerCase(); // untuk mengembalikkan nilai string yg di di panggil ke hurup kecil

    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}