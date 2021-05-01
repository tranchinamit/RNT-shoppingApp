import moment from 'moment';

export default class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = this.readableDate;
  }

  get readableDate() {
    return moment(this.date).format('MMM DD YYYY, hh:mm');
    // return this.date.toLocaleDateString('en-EN', {
    //   year: 'number',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    // });
  }
}
