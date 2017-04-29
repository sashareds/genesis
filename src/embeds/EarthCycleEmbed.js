'use strict';

const BaseEmbed = require('./BaseEmbed.js');

/**
 * Generates Earth cycle embeds
 */
class EarthCycleEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {string} language lanugage to use in calling
   * @param {Object} state - The current state of the cycle
   */
  constructor(bot, language, state) {
    super(bot);

    this.color = state.dayTime ? 0x00ff00 : 0x000066;
    this.description = this.stringManager.getString('day_night_desc', null, language, '');
    const dayTitle = this.description = this.stringManager.getString('day_title', null, language, '');
    const dayInSentence = this.description = this.stringManager.getString('day_sent', null, language, '');
    const nightTitle = this.description = this.stringManager.getString('night_title', null, language, '');
    const nightInSentence = this.description = this.stringManager.getString('night_sent', null, language, '');
    const cycleCurrent = this.description = this.stringManager.getString('cycle_current_time', null, language, '')
      .replace('$0', state.dayTime ? dayTitle : nightTitle);
    const cycleRemaining = this.description = this.stringManager.getString('cycle_remaining', null, language, '')
      .replace('$0', state.dayTime ? dayInSentence : nightInSentence)
      .replace('$1', state.timeLeft);

    this.thumbnail = {
      url: 'http://vignette1.wikia.nocookie.net/warframe/images/1/1e/Earth.png',
    };
    this.fields = [
      {
        name: cycleCurrent,
        value: cycleRemaining,
      },
    ];
  }
}

module.exports = EarthCycleEmbed;
