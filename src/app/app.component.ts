import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle = 'My Games';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}
  changeTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data.title) {
              return `${child.snapshot.data.title} ~ ${this.pageTitle}`;
            } else {
              return this.pageTitle;
            }
          }
          return this.pageTitle;
        })
      )
      .subscribe((title: any) => {
        this.titleService.setTitle(title);
      });
  }

  menuToggle() {
    $(document).ready(() => {
      if ($('#links').is(':visible')) {
        this.menuHide();
      } else {
        this.menuShow();
      }
    });

    return false;
  }
  menuHide() {
    $('#links').slideUp('fast');
  }
  menuShow() {
    $('#links').slideDown('fast');
  }
  ngOnInit(): void {
    this.changeTitle();

    $(document).ready(() => {
      $(window).resize(() => {
        if (window.innerWidth > 511) {
          $('links').show(0);
        } else {
          $('links').hide(0);
        }
      });
      $(document).on('click', '#links>a', () => {
        if(window.innerWidth<512){
          $('#links').slideUp('fast');
        }
      });
    });
  }
}
