'use strict';

const strings = require('../resources/strings.json');

class StringManager {
  /**
   * Construct a string manager for internationalizing strings
   * String template:
   *  * `$author` - Replaced by the message author
   *  * `$message` - Replaced by the message content
   *  * `$channel` - Replaced by the message channel name
   *  * `$ch_mntn` - Replaced by the message channel mention
   *
   * @param {Genesis} bot bot to fetch information from
   */
  constructor(bot) {
    this.logger = bot.logger;
  }

  /**
   * Get the localized string for a particular stringId
   * @param {string} stringId String id of the internationalized string to fetch
   * @param {Message} message Message to derive template replacement data from
   *                          as well as for fetching settings
   * @param {string} language Language of string to fetch
   * @param {string} command Command string to replace
   * @returns {Promise<string>} String promise with the corresponding string
   */
  getString(stringId, message, language, command) {
    const lang = language !== null && typeof language !== 'undefined' && language !== '' ?
      `${language.charAt(language.length - 1).toUpperCase()}${language.slice(0, language.length - 1)}`
      : 'en-US';
    let resStr = strings.languages[`${lang}`][`${stringId}`];
    if (typeof resStr !== 'undefined') {
      if (message !== null && typeof message !== 'undefined') {
        resStr = resStr
          .replace(/\$author/i, message.author.toString())
          .replace(/\$message/i, message.cleanContent)
          .replace(/\$channel/i, message.channel.name)
          .replace(/\$ch_mntn/i, message.channel.toString());
      }
      if (command !== null && typeof command !== 'undefined' && command !== '') {
        resStr = resStr.replace(/\$command/i, command);
      }
      return resStr;
    }
    this.logger.error(`No such string ${stringId} or language ${language}`);
    return null;
  }
}

module.exports = StringManager;
