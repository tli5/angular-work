import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ContentChildren, Input, QueryList} from '@angular/core';
import {
    Component,
    NgModule,
    AfterContentInit,
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'carousel-item',
  template: `
<div class="carousel-item text-center" [hidden]="hide">
   <ng-content></ng-content>
</div>
`
})
class CarouselItemComponent {
  //TODO: Show the content in this carousel
  public hide : boolean = true;
}

@Component({
  selector: 'carousel',
  template: `<div class="carousel slide">
  <div class="carousel-inner" role="listbox">
    <ng-content></ng-content>
  </div>
</div>  
`
})
class CarouselComponent implements AfterContentInit {
  @Input('delay') delay : number = 0;
  @ContentChildren(CarouselItemComponent) carouselItemList : QueryList<CarouselItemComponent>;
  
  ngAfterContentInit() {
    //TODO: maybe use the setInterval function to call a function every x milliseconds?
    let carouselItems = this.carouselItemList.toArray();
    let index = 0;
    let carouselItem = carouselItems[index];
    carouselItem.hide = false;
    
    setInterval(
      () => {
        carouselItem.hide = true;
        index = (index + 1) % carouselItems.length;
        carouselItem = carouselItems[index];
        carouselItem.hide = false;
        console.log("displaying:" + index);
      },
      this.delay
    );
  }
}


//TODO: Take a look at the markup below to see how you might implement this?
@Component({
  selector: 'app',
  template: `
<carousel [delay]="2000">
  <carousel-item>
    <img src="https://unsplash.it/200" alt="">
  </carousel-item>
  <carousel-item>
    <img src="https://twistedsifter.files.wordpress.com/2017/03/point-reyes-shipwreck.jpg" alt="">
  </carousel-item>
  <carousel-item>
    <img src="http://www.desicomments.com/wp-content/uploads/2017/01/I-Miss-You-Picture-1-600x480.jpg" alt="">
  </carousel-item>
</carousel>
`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CarouselItemComponent,
    CarouselComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);