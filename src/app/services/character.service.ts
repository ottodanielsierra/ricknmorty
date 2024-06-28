import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getAllCharacters(page: number): Observable<any> {
    const url = `${this.apiUrl}/?page=${page}`;
    return this.http.get<any>(url);
  }

  getSingleCharacter(id:number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getEpisodes(episodeUrls: string[]): Observable<any[]> {
    const episodeRequests = episodeUrls.map(url => this.http.get<any>(url));
    return forkJoin(episodeRequests);
  }

  getCharacterWithEpisodes(id: number): Observable<any> {
    return this.getSingleCharacter(id).pipe(
      switchMap(character => {
        return this.getEpisodes(character.episode).pipe(
          map(episodes => ({
            ...character,
            episodes: episodes
          }))
        );
      })
    );
  }

  searchByName(page: number, name: string): Observable<any> {
    const url = `${this.apiUrl}/?page=${page}&name=${name}`;
    return this.http.get<any>(url);
  }

}
