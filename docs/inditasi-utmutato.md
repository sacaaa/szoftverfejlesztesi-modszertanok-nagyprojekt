
# Indítási útmutató: Spring Boot Backend és React Frontend

Ez az útmutató végigvezeti a Spring Boot backend és a React frontend projekt egyszerű indításán. Feltételezzük, hogy a rendszeren telepítve vannak az alapvető fejlesztési eszközök.

---

## **Előkövetelmények**
Győződj meg róla, hogy a következő eszközök telepítve vannak:
- **Java Development Kit (JDK)** (ajánlott: JDK 17+)
- **Maven** (ajánlott: 3.6+)
- **Node.js** és **npm** (ajánlott: Node.js 16+ és npm 8+)
- **Git** (opcionális, verziókövetéshez)

---

## **1. Backend indítása (Spring Boot)**

### 1.1 Klónozd vagy töltsd le a backend projektet
```bash
git clone <repository-url> backend
cd backend
```

### 1.2 Telepítsd a szükséges függőségeket
A Maven automatikusan letölti a szükséges függőségeket a `pom.xml` fájl alapján:
```bash
mvn clean install
```

### 1.3 Konfiguráció ellenőrzése
Győződj meg róla, hogy a `src/main/resources/application.properties` fájlban megfelelően van konfigurálva:
- Adatbázis kapcsolat (pl. `spring.datasource.url`, `username`, `password`)
- Portszám (alapértelmezett: `8080`)

### 1.4 Indítsd el a backend szervert
```bash
mvn spring-boot:run
```
**A szerver elérhető lesz a következő címen:** [http://localhost:8080](http://localhost:8080)

---

## **2. Frontend indítása (React)**

### 2.1 Klónozd vagy töltsd le a frontend projektet
```bash
git clone <repository-url> frontend
cd frontend
```

### 2.2 Telepítsd a szükséges függőségeket
Használd az `npm` vagy `yarn` csomagkezelőt:
```bash
npm install
# vagy
yarn install
```

### 2.3 Konfiguráció ellenőrzése
Győződj meg róla, hogy az `src/config.js` (vagy hasonló konfigurációs fájl) tartalmazza a megfelelő backend API URL-t:
```javascript
export const API_URL = "http://localhost:8080";
```

### 2.4 Indítsd el a frontend szervert
```bash
npm start
# vagy
yarn start
```
**Az alkalmazás elérhető lesz a következő címen:** [http://localhost:3000](http://localhost:3000)

---

## **3. Teljes alkalmazás tesztelése**

- Nyisd meg a böngészőt, és látogasd meg a [http://localhost:3000](http://localhost:3000) címet.
- Teszteld az API-kat és a frontend funkciókat.
- Ellenőrizd a frontend és a backend közötti kapcsolatot.

---

## **Hibaelhárítás**

### Backend problémák
- **Portfoglalás:** Ellenőrizd, hogy a `8080` port szabad-e. Ha nem, módosítsd az `application.properties` fájlban:
  ```properties
  server.port=8081
  ```
- **Adatbázis kapcsolat:** Ellenőrizd az adatbázis elérhetőségét és a hitelesítési adatokat.

### Frontend problémák
- **API elérés:** Ha a frontend nem tudja elérni a backendet, ellenőrizd az API URL-t és a CORS beállításokat a Spring Boot konfigurációban.
- **CORS probléma:** Engedélyezd a CORS-t a backend `@CrossOrigin` annotációjával vagy egy konfigurációs osztály segítségével.

---

## **Hasznos parancsok**

### Backend
- **Függőségek újratelepítése:**
  ```bash
  mvn clean install
  ```
- **Futtatás előfordított JAR fájlból:**
  ```bash
  java -jar target/<app-name>.jar
  ```

### Frontend
- **Függőségek frissítése:**
  ```bash
  npm install
  ```
- **Build készítése:**
  ```bash
  npm run build
  ```

---

Ez az indítási útmutató segíti a fejlesztők munkáját a Spring Boot backend és a React frontend projektek gyors beüzemelésében. Ha további segítségre van szükséged, fordulj a projekt dokumentációjához vagy a fejlesztői csapathoz.
