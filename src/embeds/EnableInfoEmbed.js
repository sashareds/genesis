'use strict';

const BaseEmbed = require('./BaseEmbed.js');

/**
 * Utility class for making rich embeds
 */
class EnableInfoEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {string} language lanugage to use in calling
   * @param {number} enable - 1 if enabling command, 0 if disabling
   * @param {Array<string>} params - list of params
   */
  constructor(bot, language, enable, params) {
    super(bot);
    this.title = this.stringManager.getString('settings_change', null, language, '');
    this.type = 'rich';
    this.color = 0x0000ff;
    this.fields = [
      {
        name: this.stringManager.getString('cmd_ids', null, language, ''),
        value: params[0].join('; ') || this.stringManager.getString('no_commands', null, language, ''),
        inline: true,
      },
    ];
    if (params[1]) {
      this.fields.push({
        name: this.stringManager.getString('channels_title', null, language, ''),
        value: params[1].length > 0 ? params[1].join('; ') : this.stringManager.getString('no_channels', null, language, ''),
      });
    }
    if (params[2]) {
      this.fields.push({
        name: this.stringManager.getString('user_or_role', null, language, ''),
        value: params[2] ? params[2] : this.stringManager.getString('no_usr_role', null, language, ''),
      });
    }
    this.fields.push({
      name: this.stringManager.getString('no_usr_role', null, language, ''),
      value: enable === 1 ? this.stringManager.getString('yes', null, language, '')
        : this.stringManager.getString('no', null, language, ''),
    });
  }
}

module.exports = EnableInfoEmbed;
