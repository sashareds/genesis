'use strict';

const BaseEmbed = require('./BaseEmbed.js');

const values = ['all', 'day', 'week'];

/**
 * Generates conclave challenge embeds
 */
class ConclaveChallengeEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {string} language lanugage to use in calling
   * @param {Array.<ConclaveChallenge>} challenges - The challenges to be included in the embed
   * @param {string} category - The category of the challenges in the embed
   */
  constructor(bot, language, challenges, category) {
    super(bot);

    const categoryInValues = typeof category !== 'undefined' && values.indexOf(category.toLowerCase()) !== -1;
    this.color = categoryInValues ? 0x00ff00 : 0xff0000;
    if (categoryInValues) {
      this.fields = challenges.filter(
        c => (c.category === category.toLowerCase() || category.toLowerCase() === 'all') &&
        !c.isRootChallenge()).map(c => ({
          name: c.mode,
          value: this.stringManager.getString('desc_w_expire', null, language, '')
            .replace('$0', c.description).replace('$1', c.getEndString()),
        }));
    } else {
      this.fields = [{
        name: this.stringManager.getString('no_category', null, language, ''),
        value: this.stringManager.getString('valid_values', null, language, '')
          .replace('$0', values.join(', ')),
      }];
    }
    this.title = `${this.stringManager
      .getString('warframe', null, language, '')} - ${this.stringManager
      .getString('cc_challenge', null, language, '')}`;
    this.description = this.stringManager
      .getString('desc_w_expire', null, language, '').replace('$1', category || 'none');
    this.thumbnail = {
      url: 'https://i.imgur.com/KDzKPYA.png',
    };
  }
}

module.exports = ConclaveChallengeEmbed;
