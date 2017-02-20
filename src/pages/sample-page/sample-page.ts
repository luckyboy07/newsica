import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SampleServices } from '../../providers/sample-services';
import { CategoryPagePage } from '../../pages/category-page/category-page';
import * as _ from 'lodash';

/*
  Generated class for the SamplePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-sample-page',
    templateUrl: 'sample-page.html'
})
export class SamplePagePage {
    category: Array < any > ;
    sources: Array < any > ;
    categorycopy: Array < any > ;
    colors: string[];
    background_image: string[];
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadNews: SampleServices) {
        this.category = [];
        this.sources = [];
        this.categorycopy = [];
        this.colors = [
            'energized',
            'assertive',
            'positive',
            'calm',
            'balanced',
            'royal',
            'danger',
            'secondary'
        ];
        this.background_image = [
            './assets/icon/grid-world.svg',
            './assets/icon/network.svg',
            './assets/icon/football.svg',
            './assets/icon/loss.svg',
            './assets/icon/newspaper.svg',
            './assets/icon/player.svg',
            './assets/icon/spotify-logo.svg',
            './assets/icon/atomic.svg'
        ]
    }

    ionViewDidLoad() {
        this.loadNews.loadAPI().then((resp: any) => {
            console.log('resp:', resp);
            if (resp.status == 'ok') {

                this.sources = resp.sources;
                let category = _.uniqBy(_.map(resp.sources, (row) => {
                    return row.category;
                }));
                this.categorycopy = category;
                this.category = category;
                console.log('resp:', this.category);
            }
        })
    }
    openNext(category, color) {
        this.navCtrl.push(CategoryPagePage, {
            category: category,
            data: this.sources,
            color: color
        })
    }
    getItems(text: any) {
        let val = text.target.value;
        if (val && val.trim() != '') {
            this.category = this.category.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.category = this.categorycopy;
        }
    }
    refresh(refresher) {
        this.loadNews.loadAPI().then((resp: any) => {
            this.categorycopy = [];
            this.category = [];
            if (resp.status == 'ok') {

                this.sources = resp.sources;
                let category = _.uniqBy(_.map(resp.sources, (row) => {
                    return row.category;
                }));
                this.categorycopy = category;
                this.category = category;
                refresher.complete();
            }
        })
    }
}
