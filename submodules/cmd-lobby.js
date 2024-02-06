'use strict';

class CommandLobby {

  constructor(parent) {

    this.command = parent.mod.command;

    // command
    parent.mod.command.add('lobby', () => {
      parent.mod.send('C_RETURN_TO_LOBBY', 1, {});
    });

  }

  destructor() {
    this.command.remove('lobby');

    this.command = undefined;
  }

}

module.exports = CommandLobby;