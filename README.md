# **menU**

adalah sebuah web app untuk memudahkan orang-orang membuat list/daftar menu hariannya.

### Features

- Tampilan menu-menu makanan
- Fitur input menu makanan
- List/daftar menu makanan hari ini
- Edit list/daftar menu makanan

### **Catatan Penggunaan Github**

1. 1 Repo
   - Master => production => Public Access
   - Dev => Testing sebelum ke production
   - Branch-branch untuk fitur/page/fixing bug spesifik (branch-branch ini hanya berasal dari Dev ? maksudnya?)
2. Satu branch hanya untuk 1 fitur, 1 page, atau 1 fixing bug
3. Master hanya dipegang oleh lead
4. **TIDAK BOLEH** langsung push ke master
5. Buat branch spesifik sebagai cabang dari branch dev (checkout kesini sebelum ngerjain)
6. Pushlah ke branch spesifik yang dibuat
7. Di github **pull request** branch spesifik ke branch **dev**

contoh mau buat halaman landing page

`git checkout dev`

`git branch landing-page`

`get checkout landing-page`

- lakukan perubahan

`git push`

- terus ke github
- lakukan pull request

- **ingat kalo pull request ke cabang dev bukan master**

- bila perlu tambahkan 1 reviewer

### **Timeline**

DEADLINE : 28 Oktober

14/10/21 : Create BRD, menentukan aplikasi

15/10/21 : Wireframe

16 - 17/10/21 : Tampilan landing page, menu, menuku, dan artikel

18 - 19/10/21 : Fitur input menu makanan oleh user (web storage), Fitur login (web storage)

20 - 21/10/21 : Fitur tampilan list makanan hari ini (dari yang diinput)

22 - 23/10/21 : Fitur edit list makanan

24/10/21 : Bug Check, Perbaikan,

25/10/21 : Deploy

26/10/21 : Buat slide presentasi

27/10/21 : Record video presentasi
