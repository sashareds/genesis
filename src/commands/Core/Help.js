'use strict';

const Command = require('../../Command.js');

/**
 * Describes the Help command
 */
class Help extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot  The bot object
   */
  constructor(bot) {
    super(bot, 'core.help', 'help', 'Display this message');

    /**
     * Help reply messsage for alerting a user to check their direct messages.
     * @type {string}
     * @private
     */
    this.helpReplyMsg = process.env.HELP_REPLY || ' check your direct messages for help.';
  }

  /**
   * Send help message
   * @param {Message} message Message to reply to
   * @param {string} language lanugage to use in calling
   */
  run(message, language) {
    if (message.channel.type !== 'dm') {
      this.messageManager.reply(message, this.helpReplyMsg, true, false);
    }

    this.warframeStr = this.stringManager.getString('warframe', null, language, this.id);
    this.coreCmdTitleStr = this.stringManager.getString('core_cmds', null, language, this.id);
    this.settingsCmdTitleStr = this.stringManager.getString('settings_cmds', null, language, this.id);
    this.helpExclam = this.stringManager.getString('help_exclam', null, language, this.id);
    this.ownerOnly = this.stringManager.getString('owner_only', null, language, this.id);
    this.warframe = this.stringManager.getString('warframe', null, language, this.id);
    this.cmds = this.stringManager.getString('cmds', null, language, this.id);
    this.worldstate = this.stringManager.getString('worldstate', null, language, this.id);
    this.onDemand = this.stringManager.getString('on_demand', null, language, this.id);
    this.utilityStr = this.stringManager.getString('utility', null, language, this.id);

    this.sendCoreEmbed(message);
    if (message.channel.type === 'dm' ||
       message.channel
        .permissionsFor(message.author)
        .hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
      this.sendSettingsEmbed(message);
    }
    this.sendWorldStateEmbed(message);
    this.sendWarframeEmbed(message);
    this.sendHelpEmbed(message);
    if (message.author.id === this.bot.owner) {
      this.sendOwnerOnlyEmbed(message);
    }
  }

  sendHelpEmbed(message) {
    this.bot.settings.getChannelPrefix(message.channel).then((prefix) => {
      const commands = this.commandHandler.commands.filter(c =>
        !c.ownerOnly &&
        !/core/ig.test(c.id) &&
        !(/warframe/ig.test(c.id)) &&
        !/settings/ig.test(c.id))
        .map(c => c.usages.map(u => ({
          name: `${prefix}${c.call} ${u.parameters.map(p => `<${p}>`).join(u.separator ? u.separator : ' ')}`,
          value: u.description,
          inline: false,
        }
      )));
      this.sendEmbedForCommands(message, commands, this.helpExclam, 0x00ff00);
    }).catch(this.logger.error);
  }

  sendOwnerOnlyEmbed(message) {
    this.bot.settings.getChannelPrefix(message.channel).then((prefix) => {
      const ownerCommands = this.commandHandler.commands.filter(c => c.ownerOnly)
        .map(c => c.usages.map(u => ({
          name: `${prefix}${c.call} ${u.parameters.map(p => `<${p}>`).join(u.separator ? u.separator : ' ')}`,
          value: u.description,
          inline: false,
        })));
      this.sendEmbedForCommands(message, ownerCommands, this.ownerOnly, 0xff0000);
    }).catch(this.logger.error);
  }

  sendCoreEmbed(message) {
    this.bot.settings.getChannelPrefix(message.channel).then((prefix) => {
      const commands = this.commandHandler.commands.filter(c => !c.ownerOnly && /core/ig.test(c.id))
        .map(c => c.usages.map(u => ({
          name: `${prefix}${c.call} ${u.parameters.map(p => `<${p}>`).join(u.separator ? u.separator : ' ')}`,
          value: u.description,
          inline: false,
        })));
      this.sendEmbedForCommands(message, commands, this.coreCmdTitleStr, 0x000000);
    }).catch(this.logger.error);
  }

  sendWorldStateEmbed(message) {
    this.bot.settings.getChannelPrefix(message.channel).then((prefix) => {
      const commands = this.commandHandler.commands.filter(c => !c.ownerOnly && /warframe.worldstate/ig.test(c.id))
        .map(c => c.usages.map(u => ({
          name: `${prefix}${c.call} ${u.parameters.map(p => `<${p}>`).join(u.separator ? u.separator : ' ')}`,
          value: u.description,
          inline: false,
        })));
      this.sendEmbedForCommands(message, commands, `${this.warframe} ${this.cmds} - ${this.worldstate}`, 0x4068BD);
    }).catch(this.logger.error);
  }

  sendWarframeEmbed(message) {
    this.bot.settings.getChannelPrefix(message.channel).then((prefix) => {
      const commands = this.commandHandler.commands.filter(c => !c.ownerOnly && /warframe.(?!worldstate)/ig.test(c.id))
        .map(c => c.usages.map(u => ({
          name: `${prefix}${c.call} ${u.parameters.map(p => `<${p}>`).join(u.separator ? u.separator : ' ')}`,
          value: u.description,
          inline: false,
        })));
      this.sendEmbedForCommands(message, commands, `${this.warframe} ${this.cmds} - ${this.utilityStr}`, 0x4068BD);
    }).catch(this.logger.error);
  }

  sendSettingsEmbed(message) {
    this.bot.settings.getChannelPrefix(message.channel).then((prefix) => {
      const ownerCommands = this.commandHandler.commands.filter(c => !c.ownerOnly && /settings/ig.test(c.id))
        .map(c => c.usages.map(u => ({
          name: `${prefix}${c.call} ${u.parameters.map(p => `<${p}>`).join(u.separator ? u.separator : ' ')}`,
          value: u.description,
          inline: false,
        })));
      this.sendEmbedForCommands(message, ownerCommands, this.settingsCmdTitleStr, 0xe5c100);
    }).catch(this.logger.error);
  }

  sendEmbedForCommands(message, commands, title, color) {
    const embed = {
      title,
      fields: [].concat(...commands),
      color,
    };
    if (title === this.coreCmdTitleStr) {
      embed.type = 'rich';
      embed.thumbnail = {
        url: 'https://i.imgur.com/mXBjkuo.png',
      };
    }
    if (commands.length > 0) {
      this.messageManager.sendDirectEmbedToAuthor(message, embed, false);
    }
  }
}

module.exports = Help;
