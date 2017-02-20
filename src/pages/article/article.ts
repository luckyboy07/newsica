import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SampleServices } from '../../providers/sample-services';
import { ArticledetailPage } from '../../pages/articledetail/articledetail';
import * as moment from 'moment';
import * as _ from 'lodash';

/*
  Generated class for the Article page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-article',
    templateUrl: 'article.html'
})
export class ArticlePage {
    sources: Array < any > ;
    news_id: string;
    data: Array < any > ;
    colors: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadNews: SampleServices) {
        this.news_id = this.navParams.get('id');
        this.colors = this.navParams.get('color');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticlePage');
        this.loadNews.loadArticles(this.news_id).then((resp: any) => {
            if (resp.status == 'ok') {
                _.each(resp.articles, (row) => {
                    row.publishedAt = moment(row.publishedAt).format("MMMM Do YYYY | h:mm A");
                })
                this.sources = resp.articles;
            }
        })
    }
    getSpecificDetail(param) {
        this.navCtrl.push(ArticledetailPage, {
            data: param,
            color: this.colors
        });
    }
    refresh(refresher) {
        this.loadNews.loadArticles(this.news_id).then((resp: any) => {
            this.sources = [];
            if (resp.status == 'ok') {
                _.each(resp.articles, (row) => {
                    row.publishedAt = moment(row.publishedAt).format("MMMM Do YYYY | h:mm A");
                })
                this.sources = resp.articles;
                refresher.complete();
            }
        })
    }
}
