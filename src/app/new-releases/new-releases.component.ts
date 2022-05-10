import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html'
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases : SpotifyApi.ListOfNewReleasesResponse | any;

  private releasesSub:  Subscription | undefined;

  constructor(private data: MusicDataService) {}

  ngOnInit(): void {
    this.releasesSub = this.data.getNewReleases().subscribe((data) => {
      this.releases = data
    });
  }

  ngOnDestroy(): void {
    this.releasesSub?.unsubscribe();
  }
}