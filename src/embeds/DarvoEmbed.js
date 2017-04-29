'use strict';

const BaseEmbed = require('./BaseEmbed.js');

/**
 * Generates daily deal embeds
 */
class DarvoEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {string} language lanugage to use in calling
   * @param {DailyDeal} deal - The deal to be included in the embed
   */
  constructor(bot, language, deal) {
    super(bot);

    this.color = 0x0000ff;
    this.title = `${this.stringManager
      .getString('warframe', null, language, '')} - ${this.stringManager
      .getString('darvo', null, language, '')}`;
    this.url = 'https://warframe.com';
    this.description = this.stringManager.getString('warframe', null, language, '');
    this.thumbnail = {
      url: 'https://raw.githubusercontent.com/aliasfalse/genesis/master/src/resources/darvo.png',
    };
    this.fields = [
      {
        name: this.stringManager.getString('darvo_title_fmt', null, language, '')
          .replace('$0', deal.item).replace('$1', deal.salePrice).replace('$2', deal.total - deal.sold)
          .replace('$3', deal.total),
        value: this.stringManager.getString('darvo_price_fmt', null, language, '')
          .replace('$0', deal.originalPrice).replace('$1', deal.getEtaString()),
      },
    ];
  }
}

module.exports = DarvoEmbed;
