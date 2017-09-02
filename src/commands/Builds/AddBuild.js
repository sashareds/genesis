'use strict';

const Command = require('../../Command.js');

/**
 * Create temporary voice/text channels (can be expanded in the future)
 */
class AddBuild extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot  The bot object
   */
  constructor(bot) {
    super(bot, 'rooms.create', 'add build', 'Create a temporary room.');
    this.regex = new RegExp(`^${this.call}\\s?(.+)?`, 'i');

    this.usages = [
      { description: 'Display instructions for creating temporary rooms', parameters: [] },
      {
        description: 'Create temporary text and voice channels for the calling user.',
        parameters: ['room | raid | team'],
      },
      {
        description: 'Create temporary text and voice channels for the calling user and any mentioned users/roles.',
        parameters: ['room | raid | team', 'users and/or role'],
      },
    ];

    this.allowDM = false;
  }

  /**
   * Run the command
   * @param {Message} message Message with a command to handle, reply to,
   *                          or perform an action based on parameters.
   */
  run(message) {
    const matches = message.strippedContent.match(this.regex)[1];
    const params = (matches || '').split('|');
    if (params.length < 1) {
        // let them know there's not enough params
    } else {
        // save params based on order
    }
  }
}

module.exports = AddBuild;
