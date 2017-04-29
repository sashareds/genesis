'use strict';

const BaseEmbed = require('./BaseEmbed.js');

/**
 * Generates alert embeds
 */
class AlertEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {string} language lanugage to use in calling
   * @param {Array.<Alert>} alerts - The alerts to be included in the embed
   */
  constructor(bot, language, alerts) {
    super(bot);

    this.thumbnail = {
      url: 'http://i.imgur.com/KQ7f9l7.png',
    };
    this.color = 0xF1C40F;
    if (alerts.length > 1) {
      this.fields = alerts.map(a => ({
        name: `${a.getReward().toString().replace(/^1\s/, '')} - ${a.getETAString()} left`,
        value: `${this.stringManager.getString('alert_fmt', null, language, '')
          .replace('$0', a.mission.faction).replace('$1', a.mission.type)
          .replace('$2', a.mission.node)}\n${this.stringManager
            .getString('alert_lvl_fmt', null, language, '')
            .replace('$0', a.mission.minEnemyLevel).replace('$1', a.mission.maxEnemyLevel)}`,
      }));
      this.title = `${this.stringManager
        .getString('warframe', null, language, '')} - ${this.stringManager
        .getString('alerts', null, language, '')}`;
      this.description = this.stringManager.getString('alerts_desc', null, language, '');
    } else {
      const a = alerts[0];
      const item = a.getReward().toString().replace(/\s*\+\s*\d*cr/ig, '').replace(/^1\s/, '');
      this.title = item === '' ? a.getReward().replace(/^1\s/, '') : item;
      if (a.getReward().getTypesFull()[0].color) {
        this.color = a.getReward().getTypesFull()[0].color;
      }
      this.thumbnail.url = a.getReward().getTypesFull()[0].thumbnail;
      const summary = this.stringManager.getString('alert_fmt', null, language, '')
        .replace('$0', a.mission.faction).replace('$1', a.mission.type).replace('$2', a.mission.node);
      this.description = a.getDescription() && a.getDescription() !== '' ? a.getDescription() : summary;
      this.fields = [];
      if (this.description !== summary) {
        this.fields.push({ name: '_ _', value: `${a.mission.faction} ${a.mission.type} on ${a.mission.node}` });
      }
      this.fields.push(
        {
          name: '_ _',
          value: `**${this.stringManager.getString('levels', null, language, '')}:** ${a.mission.minEnemyLevel} - ${a.mission.maxEnemyLevel}`,
          inline: true,
        },
      );
      this.fields.push({ name: 'Archwing Required', value: a.mission.archwingRequired ? 'Yes' : 'No', inline: true });

      if (this.title.indexOf('cr') === -1) {
        this.fields.push(
          {
            name: '_ _',
            value: `**${this.stringManager.getString('credits', null, language, '')}:** ${a.getReward().credits}cr`,
            inline: true,
          },
        );
      }
      this.footer.text = this.stringManager.getString('remaining_w_pipe', null, language, '')
        .replace('$0', a.getETAString()).replace('$1', new Date().toLocaleString());
    }
  }
}

module.exports = AlertEmbed;
