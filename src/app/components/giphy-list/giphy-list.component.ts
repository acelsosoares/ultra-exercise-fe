import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GiphyData, Pagination } from 'src/app/interfaces/giphy.interface';
import { GiphyApiService } from 'src/app/services/giphy-api.service';

@Component({
  selector: 'app-giphy-list',
  templateUrl: './giphy-list.component.html',
  styleUrls: ['./giphy-list.component.scss']
})
export class GiphyListComponent implements OnInit, OnDestroy {

  public giphyTrendingItems: GiphyData[] = [];
  public giphyPagination: Pagination | undefined;
  public currentPage: number = 1;
  private itemsPerPage: number = 9;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private giphyApiService: GiphyApiService) { }

  ngOnInit(): void {
    this.giphyApiService.getTrendingGifs()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(response=>{
      this.giphyTrendingItems = response.data;
      this.giphyPagination = response.pagination;
    })
  }

  onChangePage() {
    this.giphyApiService.getTrendingGifs(undefined, this.giphyApiService.calculateOffset(this.currentPage, this.itemsPerPage))
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
