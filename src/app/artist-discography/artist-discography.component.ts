import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html'
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  id: any;
  artist: SpotifyApi.SingleArtistResponse | any;
  albums: SpotifyApi.ArtistsAlbumsResponse | any;

  private artistSub: Subscription | undefined;
  private discographySub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((artists) => {
      this.id = artists.get('id');
    });
    this.artistSub = this.data.getArtistById(this.id).subscribe((data) => {
      this.artist = data
    });
    this.discographySub = this.data.getAlbumsByArtistId(this.id).subscribe((data) => {
      (this.albums = data.items.filter((element, index) =>
        data.items.findIndex((album) => album.name.toLowerCase() === element.name.toLowerCase()) == index
      ))
    });
  }

  ngOnDestroy(): void {
    this.artistSub?.unsubscribe();
    this.discographySub?.unsubscribe();
  }
}