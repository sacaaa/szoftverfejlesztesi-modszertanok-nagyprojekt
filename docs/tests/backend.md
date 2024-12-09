# Teszt Jegyzőkönyv

**Készítette:** Székelyhidi Sándor  
**Dátum:** 2024.12.05  
**Teszt típusa:** Backend tesztelés  

---

## Teszt célja
A teszt célja, hogy ellenőrizze a backend API végpontok, az adatok betöltésének és feldolgozásának helyességét, valamint az adatbázis működését. A cél, hogy biztosítsuk az alkalmazás stabilitását és funkcionalitását.

---

## Tesztelt komponensek
1. **API végpontok**: Az összes releváns végpont működésének ellenőrzése.
2. **Adatok betöltése**: Az adatok helyes betöltése és feldolgozása.
3. **Adatbázis tesztelése**: Az adatbázis műveletek (lekérdezés, írás, frissítés, törlés) megfelelő működésének vizsgálata.

---

## Teszt környezet
- **Szerver:** Windows
- **Backend keretrendszer:** Node.js v18.0
- **Adatbázis:** SQLite
- **API kliens:** Postman 10.0
- **Tesztelési eszközök:** Unit, Postman

---

## Teszt esetek

### 1. API végpontok
| Teszteset ID | Leírás                       | Elvárt eredmény           | Eredmény      |
|--------------|------------------------------|---------------------------|---------------|
| API-001      | GET `/users` végpont        | Lista visszaadása         | Sikeres       |
| API-002      | POST `/users` végpont       | Új felhasználó létrehozása | Sikeres       |
| API-003      | PUT `/users/:id` végpont    | Felhasználó frissítése    | Sikeres       |
| API-004      | DELETE `/users/:id` végpont | Felhasználó törlése       | Sikeres       |

### 2. Adatok betöltése
| Teszteset ID | Leírás                                      | Elvárt eredmény                       | Eredmény      |
|--------------|---------------------------------------------|---------------------------------------|---------------|
| DATA-001     | JSON fájl betöltése                        | Adatok sikeres feldolgozása          | Sikeres       |
| DATA-002     | Nagyméretű adathalmaz feldolgozása          | Nincs hiba a feldolgozás során       | Sikeres       |

### 3. Adatbázis tesztelése
| Teszteset ID | Leírás                        | Elvárt eredmény              | Eredmény      |
|--------------|-------------------------------|------------------------------|---------------|
| DB-001       | Felhasználó beszúrása         | Rekord sikeres beszúrása     | Sikeres       |
| DB-002       | Felhasználók listázása        | Összes felhasználó lekérdezése | Sikeres     |
| DB-003       | Rekord frissítése             | Meglévő rekord módosítása    | Sikeres       |
| DB-004       | Rekord törlése                | Kijelölt rekord sikeres törlése | Sikeres    |

---

## Eredmények összegzése
- **Sikeres tesztek:** 10/10
- **Sikertelen tesztek:** 0
- **Átlagos futási idő:** ~1.5 másodperc

---

## Következtetések
- Az API végpontok stabilak és megfelelően működnek.
- Az adatok betöltése hibamentes, még nagyméretű adathalmaz esetén is.
- Az adatbázis műveletek pontosan és megbízhatóan teljesülnek.

---

## Ajánlások
- A jelenlegi funkciók stabilak, nincs szükség azonnali beavatkozásra.
- A további skálázhatóság érdekében javasolt a nagyméretű adatokra optimalizált teszt forgatókönyvek készítése.

---

**Készítette:**  
Székelyhidi Sándor  
