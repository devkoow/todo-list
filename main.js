const inputBox = document.querySelector('.todo__input');
const add = document.querySelector('.todo__add');
const ul = document.querySelector('.todo__list');
const item = document.querySelector('.todo__item');
const done = document.querySelector('.todo__done');
const itemText = document.querySelector('.todo__item-text');
const del = document.querySelector('.todo__delete');
const todoToday = document.querySelector('.todo__today');
const todoLeft = document.querySelector('.todo__left');
const doneAll = document.querySelector('.todo__all');
const clear = document.querySelector('.todo__clear');

// 아이템 만들기
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

  // 더블클릭 수정
  const items = document.querySelectorAll('.todo__item');
  items.forEach((item) => {
    item.addEventListener('dblclick', () => {
      const itemText = item.querySelector('.todo__item-text');

      const editInput = document.createElement('input');
      editInput.setAttribute('type', 'text');
      editInput.setAttribute('class', 'todo__edit-input');
      editInput.value = itemText.innerText;

      item.insertBefore(editInput, item.querySelector('.todo__delete'));

      editInput.focus();

      items.forEach((itemElement) => {
        const textElement = itemElement.querySelector('.todo__item-text');
        if (itemElement !== item) {
          textElement.style.display = 'inline-block';
        } else {
          textElement.style.display = 'none';
        }
      });

      editInput.addEventListener('blur', () => {
        itemText.innerText = editInput.value;
        itemText.style.display = 'inline-block';

        item.removeChild(editInput);
      });

      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          editInput.blur();
        }
      });
    });
  });
  return item;
}

// 리스트에 아이템을 추가
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

add.addEventListener('click', () => {
  onAdd();
});

inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    onAdd();
  }
});

// 오늘 할 일
function count() {
  const count = ul.childElementCount;
  todoToday.innerHTML = `오늘 할 일: ${count}개`;
}

// 남은 할 일
function leftCount() {
  const count = ul.childElementCount;
  const dones = document.querySelectorAll('.done');
  const countDone = dones.length;
  const num = count - countDone;
  todoLeft.innerHTML = `남은 할 일: ${num}개`;
}

// 전체 완료
doneAll.addEventListener('click', () => {
  const allText = document.querySelectorAll('.todo__item-text');
  allText.forEach((text) => {
    text.classList.toggle('done');
  });
  leftCount();
});

// 전체 삭제
clear.addEventListener('click', () => {
  ul.innerHTML = '';
  count();
  leftCount();
});
