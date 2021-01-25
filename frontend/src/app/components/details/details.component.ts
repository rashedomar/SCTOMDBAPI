import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from 'src/app/providers/omdb.service';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Router } from '@angular/router';

/**
 * This component shows full details of movie
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  details: Movie;
  isLoading: boolean = true;

  /**
   * Read the param(movie id) from the url, and load full details of that movies
   * @param service DI of OmdbService
   * @param route DI of ActivatedRoute
   */
  constructor(private service: OmdbService, private route: ActivatedRoute ,private router: Router ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getMovieDetails(id).subscribe(
        value => {
          this.details = value;
          console.log(value);
          if(this.details.Poster == 'N/A') {
            this.details.Poster = 'assets/no-av.png'
          }
          this.isLoading = false;
        }
      );
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
