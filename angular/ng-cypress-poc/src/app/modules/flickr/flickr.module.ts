import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlickrRoutingModule } from './flickr-routing.module';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { FullPhotoComponent } from './components/full-photo/full-photo.component';
import { FlickrSearchComponent } from './containers/flickr-search/flickr-search.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotoItemComponent,
    FullPhotoComponent,
    FlickrSearchComponent,
    SearchFormComponent,
  ],
  imports: [CommonModule, FlickrRoutingModule],
})
export class FlickrModule {}
