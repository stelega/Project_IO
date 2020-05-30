DOKUMENTACJA WEWNETRZNEGO API (in progress)

***
- Metody do odczytu i modyfikacji danych o filmach <br>
Endpoint: `/movie`  
Wymagają zalogowania jako administrator, tj. dołączenia tokena w nagłówku `access-token`


GET:  
Zwraca dane wszystkich filmow w bazie. <br>
 Odp:  
 ```json
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

POST: <br>
Tworzy nowy rekord filmu w bazie o podanych parametrach. Zwraca utworzony rekord.  
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
    
PUT: <br>
Modyfikuje rekord o podanym id na podstawie przekazanych parametrow. Zwraca zaktualizowany rekord. <br>
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


DELETE: <br>
Usuwa rekord o podanym id. Zwraca usuniety rekord.  
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

- Wyszukiwanie  
Dostepne dla metody `GET` endpointow `/movie`, `/employee`, `/hall`, `/seance`
Dołączenie do query poniższego parametru spowoduje zwrócenie tych rekordów, dla których jego wartość występuje w pewnej kolumnie:  
`/movie` - kolumna `title`  
`/employee` - kolumna `name` lub `surname` lub `login`  
`/hall` - kolumna `name`  
`/seance` - kolumna `name`  

***
- Listy danych

Dostępne kategorie wiekowe: `/category/age`  
    Response:
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
    Response:
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