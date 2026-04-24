# ShopList App - Pemrograman Mobile Pertemuan 6

## Nama & NIM

- Nama  :   [Muhammad Faried Permana]
- NIM   :   [243303621239]

## Deskripsi Aplikasi

ShopList adalah aplikasi katalog produk fashion mini yang dibangun menggunakan React Native + Expo. Aplikasi ini menampilkan 15 produk dummy dari 3 kategori (Pakaian, Sepatu, Aksesoris) lengkap dengan fitur pencarian, filter, sorting, dan berbagai mode tampilan.

## Fitur yang Diimplementasikan

### Fitur Wajib (R1–R6)
- [x] **R1** — FlatList dengan 15 produk dummy (id, name, category, price, rating, image)
- [x] **R2** — Custom `ProductCard` component (file terpisah di `components/ProductCard.js`)
- [x] **R3** — `keyExtractor` menggunakan `item.id` (string unik, bukan index array)
- [x] **R4** — `ListEmptyComponent` dengan empty state informatif (emoji + judul + hint)
- [x] **R5** — Search / Filter real-time berdasarkan nama produk (update tanpa tombol submit)
- [x] **R6** — Pull-to-Refresh menggunakan props `onRefresh` & `refreshing` bawaan FlatList

### Fitur Bonus (E1–E4)
- [x] **E1 (+10)** — Filter Kategori: chip button horizontal (Semua, Pakaian, Sepatu, Aksesoris)
- [x] **E2 (+10)** — Toggle List/Grid View: tombol toggle di header, menggunakan `numColumns`
- [x] **E3 (+5)**  — SectionList Mode: tampilan produk dikelompokkan per kategori
- [x] **E4 (+5)**  — Sort Produk: Relevan / Harga Terendah / Harga Tertinggi / Rating Tertinggi

## Screenshot

### Tampilan Utama (List Produk)
(./assets/images/list.jpg)

### Tampilan Grid View
(./assets/images/grid.jpg)

### Tampilan SectionList
(./assets/images/section.jpg)

### Tampilan Search — saat ada hasil
(./assets/images/search.jpg)

### Tampilan Empty State — saat tidak ada hasil
(./assets/images/empty.jpg)

## Struktur Folder

```
ShopList-App/
├── App.js                    ← Main app + semua logic (search, filter, sort, view mode)
├── README.md                 ← Dokumentasi project ini
├── data/
│   └── products.js           ← 15 produk dummy + daftar kategori
└── components/
    ├── ProductCard.js         ← Komponen card (support list & grid mode)
    └── SearchBar.js           ← Komponen search input dengan tombol clear
```

## Cara Menjalankan

1. Clone repo   : `git clone [https://github.com/fariidd04/pemmobile-p06-farid.git]`
2. Install deps : `npm install`
3. Jalankan     : `npx expo start`
4. Scan QR Code dengan **Expo Go** di HP kamu

## Tech Stack

- React Native (Expo)
- React Hooks: `useState`, `useMemo`, `useCallback`
- Komponen: `FlatList`, `SectionList`, `ScrollView`, `SafeAreaView`
- Styling: `StyleSheet.create` (tidak ada inline style di JSX)

## Catatan Implementasi

- `keyExtractor` mengembalikan `item.id` sebagai string — bukan index array ✅
- `numColumns` diubah dinamis saat toggle grid/list, dengan `key` prop untuk force re-render ✅
- `useMemo` digunakan untuk mengoptimasi filter+sort agar tidak recalculate tiap render ✅
- `RefreshControl` dipasang di FlatList maupun SectionList ✅