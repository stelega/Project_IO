DOKUMENTACJA WEWNETRZNEGO API (in progress)

***
#### Obsługa logowania i użytkowników
- Logowanie  
Endpoint: `/login`

**POST:**  
Przykładowe body:
```
{
	"login": "atracz",  //string
	"password": "qwerty12345",  //string
	"type": "employee"  //string, jedna z wartości ["employee", "admin"]
}
```
Response, kod `200`:  
```json
{
    "isAdmin": true,
    "name": "Adam",
    "surname": "Nowak",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImFub3dhayIsImV4cCI6MTU5MDg2NTA2N30.Jakgyu6-JfSK9swzHyBXGeecwaL1SJcJT-idCmq2Av8"
}
```  

Inne przypadki:  
Niepoprawny login lub hasło - kod `401` i odpowiedź `{"message": "Login or password incorrect"}`  
Próba zalogowania na panel administratora użytkownika bez praw - kod `403` i odpowiedź `{"message": "No access permission"}`  

- Rejestracja (dodanie pracownika)  
Endpoint: `/register`  
Wymaga zalogowania jako administrator, tj. dołączenia tokena w nagłówku `access-token`

**POST:**  
Przykładowe body:
```
{
	"name": "Jan",              //string
	"surname": "Kowalski",      //string 
	"login": "jkowalski3",      //string
	"password": "qwerty12345",  //string
	"isAdmin": false            //boolean
}
```
Response, kod `201`:  
```json
{
    "data": {
        "employeeId": "11672ef4-56dc-4fab-8e32-82cedea25254",
        "isAdmin": false,
        "login": "jkowalski3",
        "name": "Jan",
        "surname": "Kowalski"
    }
}
``` 
Jeśli podany login istnieje już w bazie - kod `409` i odpowiedź `{ "message": "User already exists" }`

- Metody do odczytu i modyfikacji danych pracowników <br>
Endpoint: `/employee`  
Wymagają zalogowania jako administrator, tj. dołączenia tokena w nagłówku `access-token`

**GET:**  
Zwraca dane wszystkich pracowników w bazie. <br>
 Odp z kodem `200`:  
 ```
{
    "count": 3,
    "data": [
        {
            "employeeId": "ff9c561f-fff2-40ec-8fe5-436de43f4032",
            "login": "anowak",
            "name": "Adam",
            "surname": "Nowak"
        },
        ...
    ]
}
```
Rest zwraca rekord o wybranym ID, jeśli zostanie przekazany parametr  `employeeId` (string - uuid)  
Jeśli rekord o wybranym ID nie istnieje, zwrocona jest wiadomosc `{"message": "Record not found"}` z kodem `404`

**PUT: <br>**
Modyfikuje rekord o podanym id na podstawie przekazanych parametrow. Zwraca zaktualizowany rekord z kodem `200`. <br>
Param: `employeeId` - string (uuid)  
Przykładowe body: (wszystkie klucze opcjonalne - dopuszczalna zmiana tylko jednej wartości)
```
        {  
            "login": "anowak",      //string
            "name": "Adam",         //string
            "surname": "Nowak"      //string
            "password": "qwerty123456"   //string
        }
```  
Jeśli rekord o wybranym ID nie istnieje, zwrocona jest wiadomosc `{"message": "Record not found"}` z kodem `404`

**DELETE: <br>**
Usuwa rekord o podanym id. Zwraca usuniety rekord z kodem `200`.  
Jeśli rekord o wybranym ID nie istnieje, zwrocona jest wiadomosc `{"message": "Record not found"}` z kodem `404`  
Param: `employeeId` - string (uuid)

***
#### Obsługa filmów
- Metody do odczytu i modyfikacji danych o filmach <br>
Endpoint: `/movie`  
Wymagają zalogowania jako administrator, tj. dołączenia tokena w nagłówku `access-token`


**GET:**  
Zwraca dane wszystkich filmow w bazie. <br>
 Odp z kodem `200`:  
 ```
{
    "count": 64,
    "data": [
        {  
            "ageCategory": "+13",
            "closeDate": "2020-05-22",  
            "director": "Adam Nowaczenko",  
            "duration": 123,  
            "movieCategory": "Fantasy",  
            "movieId": "62a8d13b-e867-4933-abb5-b564cec79859",  
            "releaseDate": "2020-01-02",  
            "title": "5.0 i inne fantazje"  
        },
        ...
    ]
}
```
Rest zwraca rekord o wybranym ID, jeśli zostanie przekazany parametr  `movieId` (string - uuid)  
Jeśli rekord o wybranym ID nie istnieje, zwrocona jest wiadomosc `{"message": "Record not found"}` z kodem `404`

**POST**: <br>
Tworzy nowy rekord filmu w bazie o podanych parametrach. Zwraca utworzony rekord z kodem `201`.  
Przykładowe body: <br>
```
        {  
            "title": "5.0 i inne fantazje",     //string
            "ageCategory": "+13",               //string z listy pod adresem /category/age
            "director": "Adam Nowaczenko",      //string
            "duration": 123,                    //int
            "movieCategory": "Fantasy",         //string z listy pod adresem /category/genre
            "releaseDate": "2020-01-02",        //string z data o podanym formacie
            "closeDate": "2020-05-22"           //string z data o podanym formacie
        }
```
    
**PUT: <br>**
Modyfikuje rekord o podanym id na podstawie przekazanych parametrow. Zwraca zaktualizowany rekord z kodem `200`. <br>
Param: `movieId` - string (uuid)  
Przykładowe body: (wszystkie klucze opcjonalne - dopuszczalna zmiana tylko jednej wartości)
```
        {  
            "title": "5.0 i inne fantazje",     //string
            "ageCategory": "+13",               //string z listy pod adresem /category/age
            "director": "Adam Nowaczenko",      //string
            "duration": 123,                    //int
            "movieCategory": "Fantasy",         //string z listy pod adresem /category/genre
            "releaseDate": "2020-01-02",        //string z data o podanym formacie
            "closeDate": "2020-05-22"           //string z data o podanym formacie
        }
```  
Jeśli rekord o wybranym ID nie istnieje, zwrocona jest wiadomosc `{"message": "Record not found"}` z kodem `404`

**DELETE: <br>**
Usuwa rekord o podanym id. Zwraca usuniety rekord z kodem `200`.  
Jeśli rekord o wybranym ID nie istnieje, zwrocona jest wiadomosc `{"message": "Record not found"}` z kodem `404`  
Param: `movieId` - string (uuid)

***



***

- Paginacja  
Dostepna dla metody `GET` endpointow `/movie`, `/employee`,`/hall`,`/seance`  
Dołączenie do query poniższych parametrów spowoduje zwrócenie tylko określonej liczby rekordów należących do wskazanej "strony"  
Params: `perPage` (int), `page` (int)  

- Sortowanie  
Dostepne dla metody `GET` endpointow `/movie`, `/employee`, `/hall`, `/seance`
Dołączenie do query poniższych parametrów spowowduje zwrócenie posortowanej listy rekordów względem parametrów.  
Dostępnymi kluczami sortowania są wszystkie kolumny poszczególnych tabeli,  
a dla seansów również klucze `title` (jako tytuł filmu) i `name` (jako nazwa sali).  
Params: `orderBy` (string), `desc` (boolean, optional - dla wartości true sortuje malejąco)  
Próba sortowania po nieistniejącej kolumnie kończy się błędem `404` i odpowiedzią postaci:  
`{ "message": "Attempt to order results by not existing column: asdda" }`

- Wyszukiwanie  
Dostepne dla metody `GET` endpointow `/movie`, `/employee`, `/hall`, `/seance`
Dołączenie do query poniższego parametru spowoduje zwrócenie tych rekordów, dla których jego wartość występuje w pewnej kolumnie:  
`/movie` - kolumna `title`  
`/employee` - kolumna `name` lub `surname` lub `login`  
`/hall` - kolumna `name`  
`/seance` - kolumna `name`  
Param: `search` (string)

***
- Listy danych

Dostępne kategorie wiekowe: `/category/age`  
    Response z kodem `200`:
```json
{
    "count": 5,
    "data": [
        "Bez ograniczeń",
        "7+",
        "12+",
        "16+",
        "18+"
    ]
}
```
Dostępne gatunki filmów: `/category/genre`  
    Response z kodem `200`:
```json
{
    "count": 4,
    "data": [
        "Fantasy",
        "Dramat",
        "Horror",
        "Komedia"
    ]
}
```