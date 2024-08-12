import React, { useState } from 'react';
import swal from 'sweetalert';

const barangList = [
    {    
        id: 1,
        nama: 'kopi',
        qty: 23,
        checked: false
    },
    {    
        id: 2,
        nama: 'bacangi',
        qty: 3,
        checked: true
    },
    {    
        id: 3,
        nama: 'rinso',
        qty: 8,
        checked: false
    },
];


export function Header() {
  return (
    <header className="header">
      <h2>Keranjang Belanjaan Anda</h2>
    </header>
  );
}


export function Form() {
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
    
      const newItem = {name, qty, checked : false, id : Date.now()};
      
      swal({
        title: "Good job!",
        text: newItem.name + " Berhasil masuk keranjang",
        icon: "success",
        button: "Aww yiss!",
      });
     
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


  
export function ListBelanja() {
  return (
    <>
      <div className="list">
        <ul>
          {barangList.map((barang) => (
            <BarangItem dataBarang={barang} key={barang.id} />
          ))}
        </ul>
      </div>

      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
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

function BarangItem({ dataBarang }) {
    return (
      <li>
        <input type="checkbox" defaultChecked={dataBarang.checked} />
        <span style={{ textDecoration: dataBarang.checked ? 'line-through' : 'none' }}>
          {dataBarang.qty} {dataBarang.nama}
        </span>
        <button>&times;</button>
      </li>
    );
  }
  

export default function Isi() {
  return (
    <div>
      <Header />
      <Form />
      <ListBelanja />
      <Footer />
      
    </div>
  );
}
