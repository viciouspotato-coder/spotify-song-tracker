import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html'
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];

  private favouriteSub: Subscription | undefined;

  constructor(private data: MusicDataService) {}

  ngOnInit(): void {
    this.favouriteSub = this.data.getFavourites().subscribe((data) => (
      this.favourites = data.tracks
    ));
  }

  removeFromFavourites(id: string): void {
    this.favouriteSub = this.data.removeFromFavourites(id).subscribe((data) => (
      this.favourites = data.tracks
    ));
  }


  ngOnDestroy(): void {
    this.favouriteSub?.unsubscribe();
  }
}
