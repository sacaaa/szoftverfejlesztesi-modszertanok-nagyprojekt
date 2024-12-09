# Teszt Jegyzőkönyv

**Készítette:** Tóth Dániel  
**Dátum:** 2024.12.06  
**Teszt típusa:** Frontend tesztelés  

---

## Teszt célja
A teszt célja a frontend komponensek működésének ellenőrzése, különös tekintettel a regisztrációs és bejelentkezési folyamatokra, az API végpontok elérésére a frontendről, valamint az animációk helyes működésére. A cél az volt, hogy biztosítsuk az alkalmazás felhasználói élményének folyamatosságát és a komponensek hibamentes működését.

---

## Tesztelt komponensek
1. **Komponensek működése**: Az egyes frontend komponensek helyes renderelése és működése.
2. **Regisztráció**: Új felhasználók sikeres regisztrálása.
3. **Bejelentkezés**: Létező felhasználók sikeres bejelentkezése.
4. **Frontendről API végpontok elérése**: Az adatok sikeres lehívása és küldése a szerver felé.
5. **Animációk**: UI elemekhez tartozó animációk megfelelő megjelenése és működése.

---

## Teszt környezet
- **Böngésző:** Google Chrome 118, Mozilla Firefox 118
- **Frontend keretrendszer:** React 18.2.0
- **Stíluskezelő:** CSS
- **Tesztelési eszközök:** Jest, React Testing Library

---

## Teszt esetek

### 1. Komponensek működése
| Teszteset ID | Leírás                            | Elvárt eredmény                   | Eredmény      |
|--------------|-----------------------------------|-----------------------------------|---------------|
| COMP-001     | Fejléc komponens renderelése      | A fejléc helyesen jelenik meg     | Sikeres       |
| COMP-002     | Űrlapok hibakezelése              | Hibák megjelennek, ha szükséges   | Sikeres       |
| COMP-003     | Dinamikus listaelemek megjelenése | Az elemek helyesen listázódnak    | Sikeres       |

### 2. Regisztráció
| Teszteset ID | Leírás                              | Elvárt eredmény                  | Eredmény      |
|--------------|-------------------------------------|----------------------------------|---------------|
| REG-001      | Új felhasználó regisztrációja       | Felhasználó sikeresen regisztrál | Sikeres       |
| REG-002      | Duplikált e-mail regisztráció       | Hibaüzenet megjelenése           | Sikeres       |

### 3. Bejelentkezés
| Teszteset ID | Leírás                              | Elvárt eredmény                  | Eredmény      |
|--------------|-------------------------------------|----------------------------------|---------------|
| LOGIN-001    | Helyes hitelesítési adatok          | Sikeres bejelentkezés            | Sikeres       |
| LOGIN-002    | Hibás jelszó                       | Hibaüzenet megjelenése           | Sikeres       |

### 4. Frontendről API végpontok elérése
| Teszteset ID | Leírás                              | Elvárt eredmény                  | Eredmény      |
|--------------|-------------------------------------|----------------------------------|---------------|
| API-001      | Adatok lehívása `/users` végpontról | Lista helyes megjelenítése       | Sikeres       |
| API-002      | Adatok küldése `/users` végpontra   | Új felhasználó sikeres létrehozása | Sikeres     |

### 5. Animációk
| Teszteset ID | Leírás                               | Elvárt eredmény                 | Eredmény      |
|--------------|--------------------------------------|----------------------------------|---------------|
| ANIM-001     | Gomb animáció hover hatásra          | Animáció helyesen jelenik meg    | Sikeres       |
| ANIM-002     | Betöltési animáció hosszú lekérdezés esetén | Animáció folyamatos megjelenítése | Sikeres   |

---

## Eredmények összegzése
- **Sikeres tesztek:** 12/12
- **Sikertelen tesztek:** 0
- **Átlagos futási idő:** ~2 másodperc tesztesetenként

---

## Következtetések
- Az összes frontend komponens megfelelően működik, beleértve a regisztrációt, a bejelentkezést, és a backend végpontokkal való kommunikációt.
- Az animációk simán futnak, és növelik a felhasználói élményt.
- Az alkalmazás frontendje jelen állapotában készen áll a felhasználók számára.

---

## Ajánlások
- További böngészőkön történő tesztelés (pl. Safari, Edge) a kompatibilitás biztosítása érdekében.

---

**Készítette:**  
Tóth Dániel  
