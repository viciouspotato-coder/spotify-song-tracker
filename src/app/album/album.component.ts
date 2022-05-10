import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit, OnDestroy {
  id: any;
  album: SpotifyApi.SingleAlbumResponse | any;

  private albumSub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private data: MusicDataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((songs) => {
      this.id = songs.get('id');
    });
    this.albumSub = this.data.getAlbumById(this.id).subscribe((data) => (
      this.album = data
    ));
  }

  addToFavourites(trackID: string) {
    this.data.addToFavourites(trackID).subscribe(
      (success) => {
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      },
      (e) => {
        this.snackBar.open("Unable to add song to Favourites", "Close", { duration: 1500 });
      })
  }

  ngOnDestroy(): void {
    this.albumSub?.unsubscribe();
  }
}