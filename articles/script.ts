import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    Directive,
    NgModule,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';




//
// Structural Directives
//

@Directive({
  selector: '[ccIf]'
})
export class CodeCraftIfDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set ccIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}


@Directive({
  selector: '[ccFor]'
})
export class CodeCraftForOfDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set ccForOf(collection: any) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

class Article {
  constructor(public title: string,
              public date: Date,
              public content: string,
              public kind: string) {
  }
}

/// Components

@Component({
  selector: 'recent-articles',
  template: `
<template 
  ngFor
  let-article
  [ngForOf]="articles">

  <div class="col-md-4">
    <div [ngClass]="article.kind ==='text'? 'card card-outline-primary' : 'card card-outline-danger'">
      <div class="card-block">
        <h4 class="card-title">Title</h4>
        <p class="card-text">{{article.title}}</p>
        <p class="card-text">
          <small class="text-muted">{{article.date | date : 'short'}}</small>
        </p>
        <p class="card-text" *ngIf="article.kind === 'text'">
          {{article.content}}
        </p>
      </div>
      <div *ngIf="article.kind !== 'text'">
        <img class="card-img-bottom img-fluid"
          src="{{article.content}}">
      </div>
    </div>
  </div>

</template>
`
})
class RecentArticlesComponent {

  articles: Article[] = [
    new Article("Title 1", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 2", new Date(), "https://unsplash.it/400?image=10", "image"),
    new Article("Title 3", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 4", new Date(), "https://unsplash.it/400?image=20", "image"),
    new Article("Title 5", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 6", new Date(), "https://unsplash.it/400?image=30", "image")
  ];
}


@Component({
  selector: 'app',
  template: `
<div class="row">
  <recent-articles></recent-articles>
  </div>
`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    RecentArticlesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);