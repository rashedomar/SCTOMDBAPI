import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

/**
 * This service is used to load data from backend(OMDB API)
 */
@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  oldurl : string = 'http://www.omdbapi.com/?&type=movie&'
  oldapikey : string = '&apikey=eb498424'
  //api: string = '&apikey=eb498424';
  url: string = 'http://localhost:3020';
  private lastSearchData = new BehaviorSubject<any[]>([]);
  private loadingValue = new BehaviorSubject<boolean>(false);
  lastSearch = this.lastSearchData.asObservable();
  loading = this.loadingValue.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Used to get movies from OMDB API -> and to update the value of BehaviorSubjects
   * @param value value to search
   * @param page page number
   */
  search(value: string, page: number) {
    this.loadingValue.next(true);
    this.http.post<any>(this.url + '/search' , {'text' : value , 'page' : page}).subscribe(
      response => {
        if (response.Response == 'True') {
         this.lastSearchData.next(response.Search);
        } else {
          this.lastSearchData.next([]);
        }
        this.loadingValue.next(false);
      }
    );
  }

  /**
   * Method to get full movie details from OMDB API
   * @param id id of the movie  
   */
  getMovieDetails(id: string): Observable<Movie> {
    return this.http.post<Movie>(this.url + '/getMovieDetails' , {'id' : id});
  }
}
