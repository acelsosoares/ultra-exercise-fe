import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public giphyCategoriesError: boolean = false;
  public isLoadingData: boolean = false;

  public form: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private giphyApiService: GiphyApiService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      categoryName: ['']
    })
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  onSelectCategory(catName: string) {
    this.router.navigate(['../'+catName], { relativeTo: this.activatedRoute });
  }

  onSubmitSearchGifsForm() {
    this.router.navigate(['../'+this.form.get('categoryName')?.value], { relativeTo: this.activatedRoute })
  }

  fetchCategories() {
    this.isLoadingData = true;
    this.giphyCategoriesError = false;
    this.giphyApiService.getCategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(response=>{
      this.giphyCategories = response.data;
    }, error => {
      this.giphyCategoriesError = true;
    }, () => {
      this.isLoadingData = false;
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
