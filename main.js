const inputBox = document.querySelector('.todo__input'); // 인풋
const add = document.querySelector('.todo__add'); // 추가 버튼
const ul = document.querySelector('.todo__list'); // 할일 리스트
const item = document.querySelector('.todo__item'); // 할일
const done = document.querySelector('.todo__done'); // 완료 버튼
const itemText = document.querySelector('.todo__item-text'); // 할일 텍스트
const del = document.querySelector('.todo__delete'); // X 버튼
const todoLeft = document.querySelector('.todo__left'); // 오늘 할 일
const todoLeftd = document.querySelector('.todo__left-d'); // 남은 할 일
const doneAll = document.querySelector('.todo__all'); // 전체 완료 버튼
const clear = document.querySelector('.todo__clear'); // 전체 삭제 버튼

// 아이템을 만드는 함수
function createItem(txt) {
  const item = document.createElement('li');
  item.setAttribute('class', 'todo__item');

  const doneBtn = document.createElement('button');
  doneBtn.setAttribute('class', 'todo__done');
  doneBtn.innerHTML = '<i class="fa-solid fa-check">';
  doneBtn.addEventListener('click', () => {
    text.classList.toggle('done');
    leftCount();
  });

  const text = document.createElement('span');
  text.setAttribute('class', 'todo__item-text');
  text.innerText = txt;

  text.addEventListener('click', () => {
    text.classList.toggle('done');
    leftCount();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'todo__delete');
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark">';
  deleteBtn.addEventListener('click', () => {
    ul.removeChild(item);
    count();
    leftCount();
  });

  item.appendChild(doneBtn);
  item.appendChild(text);
  item.appendChild(deleteBtn);
  ul.appendChild(item);
  item.scrollIntoView({ block: 'center', behavior: 'smooth' });
  return item;
}

// 아이템을 리스트에 추가하는 함수
function onAdd() {
  const text = inputBox.value;

  if (text === '') {
    inputBox.focus();
    return;
  }

  createItem(text);
  inputBox.focus();
  inputBox.value = '';
  count();
  leftCount();
}

// 할일 추가 이벤트
add.addEventListener('click', () => {
  onAdd();
  item.scrollIntoView({ block: 'center' });
});

inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    onAdd();
  }
});

// 할일 갯수를 나타내는 함수
function count() {
  const count = ul.childElementCount;
  todoLeft.innerHTML = `오늘 할 일: ${count}개`;
}

function leftCount() {
  const count = ul.childElementCount;
  const dones = document.querySelectorAll('.done');
  const countDone = dones.length;
  const num = count - countDone;
  todoLeftd.innerHTML = `남은 할 일: ${num}개`;
}

// 전체 완료 이벤트
doneAll.addEventListener('click', () => {
  const allText = document.querySelectorAll('.todo__item-text');
  allText.forEach((text) => {
    text.classList.toggle('done');
  });
  leftCount();
});

// 전체 삭제 함수 및 이벤트
function clearItem() {
  ul.innerHTML = '';
}

clear.addEventListener('click', () => {
  clearItem();
  count();
  leftCount();
});

// 더블 클릭 시 내용을 수정하는 함수
// 9월 9일에 완료하기
editText.addEventListener('dbclick', () => {});
