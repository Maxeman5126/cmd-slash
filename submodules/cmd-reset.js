'use strict';

class CommandReset {

  constructor(parent) {

    this.command = parent.mod.command;

    // command
    parent.mod.command.add(['res', 'reset', 'ff'], () => {
      parent.mod.send('C_RESET_ALL_DUNGEON', 1, {});
    });

  }

  destructor() {
    this.command.remove(['res', 'reset', 'ff']);

    this.command = undefined;
  }

}

module.exports = CommandReset;