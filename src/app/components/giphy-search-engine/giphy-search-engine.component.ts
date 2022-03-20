import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GiphyCategoriesData } from 'src/app/interfaces/giphy.interface';
import { GiphyApiService } from 'src/app/services/giphy-api.service';

@Component({
  selector: 'app-giphy-search-engine',
  templateUrl: './giphy-search-engine.component.html',
  styleUrls: ['./giphy-search-engine.component.scss']
})
export class GiphySearchEngineComponent implements OnInit, OnDestroy {

  public giphyCategories: GiphyCategoriesData[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private giphyApiService: GiphyApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.giphyApiService.getCategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(response=>{
      this.giphyCategories = response.data;
    })
  }

  onSelectCategory(catName: string) {
    console.log(catName);
    this.router.navigate(['../'+catName], { relativeTo: this.activatedRoute })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
