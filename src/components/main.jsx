import React, { useState } from 'react';
import swal from 'sweetalert';

const barangList = [
    {    
        id: 1,
        name: 'Kopi Kapal Api',
        qty: 10,
        checked: false
    },
    {    
        id: 2,
        name: 'Rinso Bubuk',
        qty: 3,
        checked: true
    },
    {    
        id: 3,
        name: 'Kecap Bango ',
        qty: 2,
        checked: false
    },
];


export function Header() {
  return (
    <header className="header">
      <h2>
        Keranjang Belanjaan Rutin Anda
        <br />
        &#128221;
      </h2>
    </header>
  );
}


export function Form({ onAddItem }) {
    const [name, setName] = useState('');
    const [qty, setQty] = useState(1);

    const numQty = [...Array(25)].map((_, i) => i + 1).map((value) => (
      <option value={value} key={value}>
        {value}
      </option>

    ));

    function handleSubmit(e) {

      e.preventDefault();

      if (!name) {
        swal('Inputan Tidak Boleh Kosong', 'Perhatikan Inputan Anda', 'warning');
        return;
      }
    
      const newItem = {qty, name, checked : false, id : Date.now()};

      onAddItem(newItem);
     
    }
  
    return (
      
      <form className="add-form" onSubmit={handleSubmit}>
        <div>

          <select value={qty} onChange={(e) => setQty(Number(e.target.value))}> 
            {numQty} 
          </select>

          <input type="text" placeholder="nama barang..." 
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button>Tambah</button>
      </form>
    );
}


  
export function ListBelanja({ items, onRemoveItem, onToogleItem, onClearItem }) {

  const [sort, setSort] = useState('input');

  let sortedItems = [...items];
  if (sort === 'name') {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'checked') {
    sortedItems.sort((a, b) => Number(a.checked) - Number(b.checked));
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((barang) => (
            <BarangItem 
              dataBarang={barang} 
              key={barang.id} 
              onRemoveItem={onRemoveItem}
              onToogleItem={onToogleItem}
            />
          ))}
        </ul>
      </div>

      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItem}>Bersihkan Daftar</button>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="stats">
      Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)
    </footer>
  );
}

function BarangItem({ dataBarang, onRemoveItem, onToogleItem }) {
    return (
      <li>
        <input type="checkbox" defaultChecked={dataBarang.checked} onChange={() => onToogleItem(dataBarang.id)} />
        <span style={{ textDecoration: dataBarang.checked ? 'line-through' : 'none' }}>
          {dataBarang.qty} {dataBarang.name}
        </span>   
        <button onClick={() => onRemoveItem(dataBarang.id)}>X</button>
      </li>
    );
  } 

export default function App() {

  const [items, setItems] = useState(barangList);

  function handleAddItem(item) {
    setItems([...items, item]);
  };

  function handleRemoveItem(id) {
    setItems(items.filter(item => item.id !== id));

  };

  function handleToggleItem (id) {
    setItems((items) => items.map((item) => item.id === id ? {...item, checked: !item.checked} : item));
  }

  function handleClearList() {
    setItems([ ]);
  }

  
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Form onAddItem={handleAddItem} />
        <ListBelanja items={items} onRemoveItem={handleRemoveItem} onToogleItem={handleToggleItem} onClearItem={handleClearList} />
      </div>
      <Footer />
    </div>
  );
}
