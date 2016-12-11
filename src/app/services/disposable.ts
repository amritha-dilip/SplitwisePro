import { Subscription } from 'rxjs/Subscription';
import { forEach } from 'lodash';

export class Disposable {
    private _subscriptions: Subscription[] = [];

    protected markDispose(subscription: Subscription[])
    protected markDispose(subscription: Subscription)
    protected markDispose(subscription: any) {
        if (Array.isArray(subscription)) {
            this._subscriptions = this._subscriptions.concat(subscription);
        }
        else if (subscription instanceof Subscription) {
            this._subscriptions.push(subscription);
        }
    }

    ngOnDestroy() {
        forEach(this._subscriptions, subscription => {
            if (!subscription.closed) {
                subscription.unsubscribe();
            }
        });

        this._subscriptions = [];
    }
}
