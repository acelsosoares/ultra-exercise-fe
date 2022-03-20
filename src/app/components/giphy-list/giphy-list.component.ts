import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
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
  public currentPage: number = 1;
  private itemsPerPage: number = 9;
  private selectedCategory: string = 'trending';

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private giphyApiService: GiphyApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.selectedCategory = params['categoryName'];

      this.fetchGifs();
    })
  }

  onChangePage() {
    this.fetchGifs();
  }

  fetchGifs() {
    this.giphyApiService.getGifs(this.selectedCategory, this.itemsPerPage, this.giphyApiService.calculateOffset(this.currentPage, this.itemsPerPage))
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(response=>{
      this.giphyItems = response.data;
      this.giphyPagination = response.pagination;
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
