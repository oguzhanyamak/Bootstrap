// id değeri atanan html etiketlerinin elde edilmesi
const todoList = document.getElementById('todo-list');
const todoInput  = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');
const todoFilter = document.getElementById('todo-filter'); 

//yapılacaklar listesi
const todos = getTodosFromStorage();

const dones = getDonesFromStorage();

window.addEventListener('load',() => {
    //sayfanın yüklenme işlemi
    console.log(typeof todos);
    getTodosToPage();
    getDonesToPage();
});

todoButton.addEventListener('click',() =>{
    //ekleme buttonunun tıklanma işlemi
    const input = todoInput.value;
    if(input)
        saveTodosToStorage(input);
    todoInput.value="";
});

todoInput.addEventListener('keyup',(event) => {
    if(event.keyCode == 13) todoButton.click();
})
function getTodosFromStorage(){
    const storage = JSON.parse(localStorage.getItem('todos'));
    return (storage) ? storage : [];
}
function getDonesFromStorage(){
    const storage = JSON.parse(localStorage.getItem('dones'));
    return (storage) ? storage : [];
}

function getTodosToPage() {
    //yapılacakların ekrana getirilmesi
    todos.forEach((todo) => {
        createTodoItem(todo);
    });
}

function getDonesToPage(){
    dones.forEach((done)=>{
        createDoneItem(done);
    });
}

function saveTodosToStorage(todo){
    //girilen bilginin localStorage a kayt edilmesi
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todo));
    createTodoItem(todo);
}

function checkTodo (target){
    //tik işareti atılacak elemana erişilmesi
    const todo = target.parentNode.childNodes[0].innerHTML;
    moveTodoToDone(todo,target)
}

function moveTodoToDone(todo,target){
    //gelen bilginin yapılacaklar listesinden silinip , yapılanlar listetsine atılmak üzerene gerekli fonksiyona yönlendirilir.
    removeTodoFromStorage(todo);
    dones.push(todo);
    localStorage.setItem('dones',JSON.stringify(dones));
    makeItDone(target);
}

function moveDoneToTodos(done,target){
    //Tamamlananlar listesinden silinip , tekrar todos listesine eklenmesi
    removeDoneFromStorage(done);
    todos.push(done);
    localStorage.setItem('todos',JSON.stringify(todos));
    makeItTodo(target);
}

function makeItDone(target){
    //tiklenen elemanın etiket bazında düzenlenmesi
    const done = target.parentNode.classList.add('done');
    target.parentNode.classList.remove('todo');
    target.parentNode.childNodes[2].setAttribute('onclick','removeDone(this)');
    target.className = '';
    target.classList.add('fas','fa-check-square');
    target.setAttribute('onclick','uncheckDone(this)');
}

function makeItTodo(target){
    //tiki kaldırılan elemanın etiket bazında düzenlenmesi
    target.parentNode.classList.remove('done');
    target.parentNode.classList.add('todo');
    target.parentNode.childNodes[2].setAttribute('onclick','removeTodo(this)');
    target.className = '';
    target.classList.add('fas','fa-square');
    target.setAttribute('onclick','checkTodo(this)');
}

function uncheckDone(target){
    //İşaretlenen elemanın işaretinin kaldırılması için erişilmesi
    const done  = target.parentNode.childNodes[0].innerHTML;
    moveDoneToTodos(done,target);
}

function createTodoItem(text){
    //Girilen değer için html içeriklerinin ayarlanması
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item','todo');
    const todoItemLi = document.createElement('li');
    todoItemLi.innerHTML = text;
    const todoItemCheck = document.createElement('i');
    todoItemCheck.classList.add('fas','fa-square');
    todoItemCheck.setAttribute('onclick','checkTodo(this)');
    const todoItemRemove = document.createElement('i');
    todoItemRemove.classList.add('fas','fa-trash-alt');
    todoItemRemove.setAttribute('onclick','removeTodo(this)');

    todoItem.appendChild(todoItemLi);
    todoItem.appendChild(todoItemCheck);
    todoItem.appendChild(todoItemRemove);
    todoList.appendChild(todoItem);
}

function createDoneItem(text){
    //tamamlanan değer için html içeriklerinin ayarlanması
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item','done');
    const todoItemLi = document.createElement('li');
    todoItemLi.innerHTML = text;
    const todoItemCheck = document.createElement('i');
    todoItemCheck.classList.add('fas','fa-check-square');
    todoItemCheck.setAttribute('onclick','uncheckDone(this)');
    const todoItemRemove = document.createElement('i');
    todoItemRemove.classList.add('fas','fa-trash-alt');
    todoItemRemove.setAttribute('onclick','removeDone(this)');

    todoItem.appendChild(todoItemLi);
    todoItem.appendChild(todoItemCheck);
    todoItem.appendChild(todoItemRemove);
    todoList.appendChild(todoItem);
}


function removeTodo(target){
    //silinecek liste elemanına erişilmesi;
    const todo = target.parentNode.childNodes[0].innerHTML; //silinecek değer
    removeTodoFromStorage(todo);
    target.parentNode.remove();
}

function removeDone(target){
    const done = target.parentNode.childNodes[0].innerHTML; //silinecek değer
    removeDoneFromStorage(done);
    target.parentNode.remove();
}

function removeTodoFromStorage(todo){
    //localStorage'dan liste öğesinin silinmesi
    const index = todos.indexOf(todo);
    if(index > -1){
        todos.splice(index,1);
        localStorage.setItem('todos',JSON.stringify(todos));
    }
}
function removeDoneFromStorage(done){
    //tamamlanan elemanın silinmesi
    const index = dones.indexOf(done);
    if(index > -1){
        dones.splice(index,1);
        localStorage.setItem('dones',JSON.stringify(dones));
    }
}

todoFilter.addEventListener('click',()=>{
    todoList.dataset.filter = (parseInt(todoList.dataset.filter) + 1) %3;
    listFilter();
});

function listFilter(){
    const items = todoList.getElementsByClassName('todo-item');
    let array = [].map.call(items,item => item);
    const filter = todoList.dataset.filter;
    array.forEach((item) => {
        switch (filter){
            case '0':
                todoFilter.className='';
                todoFilter.classList.add('far','fa-square');
                item.style.display='flex';
                break;
            case '1':
                todoFilter.className='';
                todoFilter.classList.add('fas','fa-square');
                if(item.classList.contains('done')){
                    item.style.display='none';
                }
                else item.style.display='flex'; 
                break;
                case '2':
                    todoFilter.className='';
                    todoFilter.classList.add('fas','fa-check-square');
                    if(item.classList.contains('todo')){
                        item.style.display='none';
                    }
                    else item.style.display='flex'; 
                    break;
        }
    })
}