import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GiphyData } from 'src/app/interfaces/giphy.interface';
import { GiphyApiService } from 'src/app/services/giphy-api.service';

@Component({
  selector: 'app-giphy-list',
  templateUrl: './giphy-list.component.html',
  styleUrls: ['./giphy-list.component.scss']
})
export class GiphyListComponent implements OnInit, OnDestroy {

  public giphyTrendingItems: GiphyData[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private giphyApiService: GiphyApiService) { }

  ngOnInit(): void {
    this.giphyApiService.getTrendingGifs()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(response=>{
      this.giphyTrendingItems = response.data;
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
