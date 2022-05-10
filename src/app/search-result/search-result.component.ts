import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: string = '';

  private searchSub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.searchQuery = param['q'];
      this.searchSub = this.data.searchArtists(this.searchQuery).subscribe((data) =>
        (this.results = data.artists.items.filter((artist) => artist.images.length > 0))
      );
    });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }
}
