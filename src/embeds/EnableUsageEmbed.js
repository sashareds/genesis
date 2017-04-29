'use strict';

const BaseEmbed = require('./BaseEmbed.js');

/**
 * Utility class for making rich embeds
 */
class EnableUsageEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {string} language lanugage to use in calling
   * @param {Array<string>} params - list of params
   * @param {number} enable 1 if enable, 0 if disable
   */
  constructor(bot, language, params, enable) {
    super(bot);
    const enableLower = this.stringManager.getString('enable_lower', null, language, '');
    const enablingLower = this.stringManager.getString('enabling_lower', null, language, '');
    const disableLower = this.stringManager.getString('disable_lower', null, language, '');
    const disablingLower = this.stringManager.getString('disabling_lower', null, language, '');
    const enableDisc = this.stringManager.getString('enable_disable_disc', null, language, '');

    this.title = this.stringManager.getString('usage', null, language, '');
    this.type = 'rich';
    this.color = 0x0000ff;
    this.description = `${bot.prefix}${enable === 1 ? enableLower : disableLower} ${enableDisc}`;
    this.fields = [
      {
        name: this.stringManager.getString('cmd_id_param', null, language, ''),
        value: this.stringManager.getString('cmd_id_disc', null, language, ''),
      },
      {
        name: this.stringManager.getString('channel_param', null, language, ''),
        value: this.stringManager.getString('channel_param_disc', null, language, '')
          .replace('$0', enable === 1 ? enablingLower : disablingLower),
      },
      {
        name: this.stringManager.getString('usr_role_param', null, language, ''),
        value: this.stringManager.getString('usr_role_param_disc', null, language, '')
          .replace('$0', enable === 1 ? enableLower : disableLower),
      },
    ];

    if (params) {
      this.fields.push({
        name: this.stringManager.getString('provided_params', null, language, ''),
        value: params.join(' | '),
      });
    }
  }
}

module.exports = EnableUsageEmbed;
