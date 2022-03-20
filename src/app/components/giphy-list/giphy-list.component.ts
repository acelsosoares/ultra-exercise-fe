import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { GiphyData, Pagination } from 'src/app/interfaces/giphy.interface';
import { GiphyApiService } from 'src/app/services/giphy-api.service';

@Component({
  selector: 'app-giphy-list',
  templateUrl: './giphy-list.component.html',
  styleUrls: ['./giphy-list.component.scss']
})
export class GiphyListComponent implements OnInit, OnDestroy {

  public giphyItems: GiphyData[] = [];
  public giphyPagination: Pagination | undefined;
  public giphyItemsError: boolean = false;
  public isLoadingData: boolean = false;
  public currentPage: number = 1;
  private itemsPerPage: number = 9;
  private selectedCategory: string = 'trending';

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private giphyApiService: GiphyApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(params => {
      this.selectedCategory = params['categoryName'];

      this.fetchGifs();
    })
  }

  onChangePage() {
    this.fetchGifs();
  }

  fetchGifs() {
    this.isLoadingData = true;
    this.giphyItemsError = false;
    this.giphyApiService.getGifs(this.selectedCategory, this.itemsPerPage, this.giphyApiService.calculateOffset(this.currentPage, this.itemsPerPage))
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(response => {
      this.giphyItems = response.data;
      this.giphyPagination = response.pagination;
    }, error => {
      this.giphyItemsError = true;
    }, () => {
      this.isLoadingData = false;
    })
  }
  
  buildTitle():string {
    return this.selectedCategory;
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
