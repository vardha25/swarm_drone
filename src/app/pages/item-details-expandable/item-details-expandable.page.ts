
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListViewExpandableService } from 'src/app/core/services/list-view-expandable-service';
import { ToastService } from 'src/app/core/services/toast-service';


@Component({
    templateUrl: 'item-details-expandable.page.html',
    styleUrls: ['item-details-expandable.page.scss'],
    providers: [ListViewExpandableService]
})
export class ItemDetailsExpandablePage {

    data = {
        'toolbarTitle': ''
    };
    type: string;

    constructor(
        public navCtrl: NavController,
        private service: ListViewExpandableService,
        private toastCtrl: ToastService) {
        this.service.load().subscribe(d => {
            this.data = d;
        });
    }

    isType(item) {
        return item === parseInt(this.type, 10);
    }

    // events
    onRates(params): void {
        this.toastCtrl.presentToast('onRates:' + JSON.stringify(params));
    }
    onItemClick(params): void {
        this.toastCtrl.presentToast('onItemClick:' + JSON.stringify(params));
    }
    onFavorite(params): void {
        this.toastCtrl.presentToast('onFavorite');
    }
    onLike(): void {
        this.toastCtrl.presentToast('onLike');
    }
    onShare(): void {
        this.toastCtrl.presentToast('onShare');
    }
    onCheckBoxClick(params): void {
        this.toastCtrl.presentToast('onCheckBoxClick:' + JSON.stringify(params));
    }
    onButtonClick(params): void {
        this.toastCtrl.presentToast('onButtonClick:' + JSON.stringify(params));
    }
}
