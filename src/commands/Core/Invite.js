'use strict';

const Command = require('../../Command.js');

/**
 * Displays the response time for the bot and checks Warframe's servers to see if they are up
 */
class Invite extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot The bot object
   */
  constructor(bot) {
    super(bot, 'core.invite', 'invite', 'Send Invitation Link to Authorize Bot to Join a Server');
  }

  /**
   * Run the command
   * @param {Message} message Message with a command to handle, reply to,
   *                          or perform an action based on parameters.
   * @param {string} language lanugage to use in calling
   */
  run(message, language) {
    this.messageManager.reply(message, process.env.INVITE_URL ||
      this.stringManager.getString('no_inv_link', null, language, this.id), true, false);
  }
}

module.exports = Invite;
