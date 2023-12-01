import { useState } from 'react'
import './App.css'
import Items from './components/Items'

function App() {
  const [form, setForm] = useState<ItemsType>({
    date: '',
    distance: '',
    items: [],
});

  type ItemsType = {
    date: string,
    distance: string,
    items: Item[],
  }

  type Item = {
    date: string,
    distance: number,
  }

  const onSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    let done = false;
    for (let i = 0; i < form.items.length; i++) {
      if (form.items[i].date === form.date) {
        form.items[i].distance += Number(form.distance);
        done = true;
      }
    }
    if (done === false) {
      form.items.push({ date: form.date, distance: Number(form.distance) });
    }
    form.date = '';
    form.distance = '';
    setForm(prev => ({ ...prev }));
  }

  const onChange = (e: { target: { name: string; value: string; }; }) => {
    if (e.target.name === 'distance') {
      setForm(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
    } else {
      setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const removeItem = (e: React.MouseEvent<HTMLButtonElement> ): void => {
    for (let i = 0; i < form.items.length; i++) {
      if (form.items[i].date === e.target.dataset.id) {
        form.items.splice(i, 1);
      }
    }

    setForm(prev => ({ ...prev }))
  }

  const sortItems = () => {
    return [...form.items].sort((data1, data2) => data1.date.split('.').reverse().join('-').localeCompare(data2.date.split('.').reverse().join('-')) > 0 ? 1 : -1);
  }

  return (
    <>
      <div className="container">
        <div className="">
          <form className="form" onSubmit={onSubmit}>
            <input className="form-input form-input-date" type="text" name="date" placeholder="Дата (ДД.ММ.ГГГГ)" onChange={onChange}></input>
            <input className="form-input" type="text" name="distance" placeholder="Пройдено км" onChange={onChange}></input>
            <button className="form-button" type="submit">OK</button>
          </form>
        </div>
        <div className="content">
          <div className="content-header">
            <span>Дата (ДД.ММ.ГГ)</span>
            <span>Пройдено км</span>
            <span>Действия</span>
          </div>
          <div className="content-main">
            {sortItems().map((el, index) => 
              <Items 
              key={index}
              item={el}
              removeItem={removeItem}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
