import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './user/user.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { VideoModule } from './video/video.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    VideoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
